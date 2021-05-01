import { getState, updateState } from 'lib/store';
import { LocalStateError, NoUserIdError } from 'lib/errors';
import { events } from 'lib/api';

import {
  BroadcastSpeakingData,
  DisplayToastData,
  SpaceJoinedData,
  EntityChangedData,
  ServerInviteData,
  ObjectEntity,
  DroppablesDroppedData,
  SpaceChangedData,
} from 'lib/types/sonar';

enum ReceivedMessageType {
  SpaceJoined = 'space_joined',
  SpaceChanged = 'space_changed',
  AudioChannelSubscriptionsUpdated = 'audio_channel_subscriptions_updated',
  DisplayToast = 'display_toast',
  GameObjects = 'game_objects',
  EntitiesChanged = 'entities_changed',
  EntitiesDespawned = 'entities_despawned',
  EntitiesSpawned = 'entities_spawned',
  DroppablesLifted = 'droppables_lifted',
  DroppablesDropped = 'droppables_dropped',
  DroppablesPlaced = 'droppables_placed',
  BroadcastSpeaking = 'broadcast_speaking',
  Horn = 'horn',
}

export type ReceivedMessage =
  | { type: ReceivedMessageType.SpaceJoined; data: SpaceJoinedData; }
  | { type: ReceivedMessageType.SpaceChanged; data: SpaceChangedData; }
  | { type: ReceivedMessageType.DisplayToast; data: DisplayToastData; }
  | { type: ReceivedMessageType.BroadcastSpeaking; data: BroadcastSpeakingData; }
  | { type: ReceivedMessageType.EntitiesChanged; data: EntityChangedData; }
  | { type: ReceivedMessageType.EntitiesSpawned; data: EntityChangedData; }
  | { type: ReceivedMessageType.DroppablesDropped; data: DroppablesDroppedData; }
;

function handleMessage(msg: ReceivedMessage): void {
  switch (msg.type) {
    case ReceivedMessageType.SpaceJoined:
      return handleJoinedServer(msg.data);

    case ReceivedMessageType.EntitiesChanged:
      return handleEntitiesChanged(msg.data);

    case ReceivedMessageType.DroppablesDropped:
      return handleObjectDropped(msg.data.gameObjects.filter(x => !!x)[0]);

    case ReceivedMessageType.DisplayToast: {
      // Received server Invite
      if (msg.data.message.includes('invited you to')) {
        let [username, roomName] = msg.data.highlightedText;
        const roomId = msg.data.senderRoomId!;
        username = username.replace('@', '') ?? null;
        return handleReceivedServerInvite({ roomId, username, roomName });
      }

      // Received friend request
      if (msg.data.message.includes('wants to be your friend')) {
        const username = msg.data.highlightedText[0].replace('@', '');
        return handleReceivedFriendRequest(username, msg.data.userId);
      }
    }
  }
}

function handleObjectDropped(item: ObjectEntity) {
  const { id, name, position } = item;
  console.log({ item: JSON.stringify(item) });
  events.emit('objectDropped', { id, name, position });
}

function handleEntitiesChanged(data: EntityChangedData) {
  const user = data.users?.[0];
  const object = data.objects?.[0];

  if (user) {
    // const { room } = updateState(state => state.cache.users.set(user.id, user));
    events.emit('userJoined', user); // TODO: Discern between userJoined and userLeft
    // events.emit('userLeft', user);
  } else if (object) {
    events.emit('objectSpawned', object);
  }
}

function handleReceivedServerInvite(data: ServerInviteData) {
  events.emit('receivedPing', data);
}

function handleJoinedServer(data: SpaceJoinedData) {
  const { userId } = getState();
  
  const user = data.gameData.users.find(u => u.id === userId) ?? NoUserIdError();
  const x = user.position.x;
  const y = user.position.y;
  const moveId = user.moveId;

  const { objects, users } = data.gameData;

  updateState(state => (state.room = {
    ...data.room,
    entities: { objects, users },
    position: { x, y },
  }));

  updateState(state => (state.moveId = moveId));

  const room = getState().room;
  
  if (!room) throw LocalStateError('getState().room is null after joining server');

  events.emit('joinedServer', room);
}

function handleReceivedFriendRequest(username: string, id: Maybe<number>) {
  events.emit('receivedFriendRequest', { name: username, id });
}


export { handleMessage };
