import { getState, updateState } from '../../state';
// import { eventHandlerMap } from '../events';
import { NoUserIdError } from '../../errors';
import { events } from '../events';

enum ReceivedMessageType {
  SpaceJoined = 'space_joined',
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
| { type: ReceivedMessageType.SpaceJoined; data: SpaceJoinedData }
| { type: ReceivedMessageType.DisplayToast; data: DisplayToastData }
| { type: ReceivedMessageType.EntitiesChanged; data: UserChangedData }
| { type: ReceivedMessageType.EntitiesChanged; data: ObjectChangedData }

let handleMessage = async (msg: ReceivedMessage) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('[Received]: ' + JSON.stringify(msg));
  }

  switch (msg.type) {
    case ReceivedMessageType.DisplayToast: {
      if (msg.data.message.includes('booped you')) {
        handleBoop(msg.data);
      }
      return;
    }

    case ReceivedMessageType.SpaceJoined: {
      handleJoinRoom(msg.data);
      return;
    }

    case ReceivedMessageType.EntitiesChanged: {
      let dot = msg.data.users?.[0];
      let object = msg.data.objects?.[0];
      if (dot) { /* handleDotChange */ }
      if (object) { /* handleObjectChange */ }
    }
  }
};

export { handleMessage };

// Todo: Clean this up...
let handleBoop = async ({ senderRoomId: roomId, highlightedText }: DisplayToastData) => {
  if (!roomId) return;

  let [username, roomName] = highlightedText;

  username = username?.replace('@', '') ?? null;

  let data: OnBoopData = {
    roomId,
    username,
    roomName,
  };

  await events.publish('boop', data);
};

let handleJoinRoom = (msg: SpaceJoinedData) => {
  if (!msg) return;
  let user = msg.gameData.users.find(u => u.id === getState().userId) ?? NoUserIdError();
  let x = user.position!.x;
  let y = user.position!.y;
  let moveId = user?.moveId;

  let entities = msg.gameData.objects;

  updateState(state => state.currentRoom = ({
    data: msg.data,
    entities,
    x,
    y,
  }));

  updateState(state => state.moveId = moveId!);

  events.publish('join_room');
};

