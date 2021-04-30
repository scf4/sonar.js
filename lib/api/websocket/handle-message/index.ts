import { getState, updateState } from 'lib/state';
import { NoUserIdError } from 'lib/errors';
import { events } from 'lib/api';

import {
  BroadcastSpeakingData,
  DisplayToastData,
  SpaceJoinedData,
  EntityChangedData,
  ServerInviteData,
  ObjectEntity,
  DroppablesDroppedData,
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
  | { type: ReceivedMessageType.SpaceChanged; data: any; }
  | { type: ReceivedMessageType.DisplayToast; data: DisplayToastData; }
  | { type: ReceivedMessageType.BroadcastSpeaking; data: BroadcastSpeakingData; }
  | { type: ReceivedMessageType.EntitiesChanged; data: EntityChangedData; }
  | { type: ReceivedMessageType.EntitiesSpawned; data: EntityChangedData; }
  | { type: ReceivedMessageType.DroppablesDropped; data: DroppablesDroppedData; }
;

function handleMessage(msg: ReceivedMessage): void {
  switch (msg.type) {
    case ReceivedMessageType.SpaceJoined:
      return handleJoinServer(msg.data);

    case ReceivedMessageType.EntitiesChanged:
      return handleEntitiesChanged(msg.data);

    case ReceivedMessageType.DroppablesDropped:
      return handleDroppablesDropped(msg.data.gameObjects[0]);

    case ReceivedMessageType.DisplayToast: {
      // Server Invite
      if (msg.data.message.includes('invited you to')) {
        let [username, roomName] = msg.data.highlightedText;
        const roomId = msg.data.senderRoomId!;
        username = username.replace('@', '') ?? null;
        return handleServerInvite({ roomId, username, roomName });
      }

      // Friend request
      if (msg.data.message.includes('wants to be your friend')) {
        const username = msg.data.highlightedText[0].replace('@', '');
        return handleFriendRequest(username, msg.data.userId);
      }
    }
  }
}

function handleDroppablesDropped(item: ObjectEntity) {
  const { id, name, position } = item;
  events.emit('object_dropped', { id, name, position });
}

function handleEntitiesChanged(data: EntityChangedData) {
  const user = data.users?.[0];
  const object = data.objects?.[0];

  if (user) {
    updateState(state => state.cache.users.set(user.id, user));
    events.emit('user_join', user);
  } else if (object) {
    events.emit('object_spawn', object);
  }
}

function handleServerInvite(data: ServerInviteData) {
  events.emit('boop', data);
}

function handleJoinServer(data: SpaceJoinedData) {
  const user = data.gameData.users.find(u => u.id === getState().userId) ?? NoUserIdError();
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

  events.emit('join_room', getState().room!);
}

function handleFriendRequest(username: string, id: Maybe<number>) {
  events.emit('friend_request', { name: username, id });
}

export { handleMessage };
