import { getState, updateState } from 'lib/state';
import { NoUserIdError } from 'lib/errors';
import { events } from 'lib/api';

import {
  BroadcastSpeakingData,
  DisplayToastData,
  SpaceJoinedData,
  EntityChangedData,
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
  ;

function handleMessage(msg: ReceivedMessage): any {
  switch (msg.type) {
    case ReceivedMessageType.DisplayToast: {
      if (msg.data.message.includes('invited you to')) return handleBoop(msg.data);
      return;
    }

    case ReceivedMessageType.SpaceJoined:
      return handleJoinRoom(msg.data);

    case ReceivedMessageType.EntitiesChanged:
      return handleEntitiesChanged(msg.data);
  }
}

function handleEntitiesChanged(data: EntityChangedData) {
  const user = data.users?.[0];
  const object = data.objects?.[0];

  if (user) {
    updateState((state) => state.cache.users.set(user.id, user));
    return events.emit('user_join', user);
  }

  if (object) return events.emit('object_spawn', {} as any);

  return null;
}

function handleBoop({ senderRoomId: roomId, highlightedText }: DisplayToastData) {
  if (!roomId) return;

  const [username, roomName] = highlightedText;

  events.emit('boop', {
    roomId,
    roomName,
    username: username.replace('@', '') ?? null,
  });
}

function handleJoinRoom(data: SpaceJoinedData) {
  const user = data.gameData.users.find(u => u.id === getState().userId) ?? NoUserIdError();
  const x = user.position!.x;
  const y = user.position!.y;
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

export { handleMessage };
