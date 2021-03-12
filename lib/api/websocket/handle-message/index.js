"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleMessage = void 0;
const api_1 = require("lib/api");
const errors_1 = require("lib/errors");
const state_1 = require("lib/state");
var ReceivedMessageType;
(function (ReceivedMessageType) {
    ReceivedMessageType["SpaceJoined"] = "space_joined";
    ReceivedMessageType["SpaceChanged"] = "space_changed";
    ReceivedMessageType["AudioChannelSubscriptionsUpdated"] = "audio_channel_subscriptions_updated";
    ReceivedMessageType["DisplayToast"] = "display_toast";
    ReceivedMessageType["GameObjects"] = "game_objects";
    ReceivedMessageType["EntitiesChanged"] = "entities_changed";
    ReceivedMessageType["EntitiesDespawned"] = "entities_despawned";
    ReceivedMessageType["EntitiesSpawned"] = "entities_spawned";
    ReceivedMessageType["DroppablesLifted"] = "droppables_lifted";
    ReceivedMessageType["DroppablesDropped"] = "droppables_dropped";
    ReceivedMessageType["DroppablesPlaced"] = "droppables_placed";
    ReceivedMessageType["BroadcastSpeaking"] = "broadcast_speaking";
    ReceivedMessageType["Horn"] = "horn";
})(ReceivedMessageType || (ReceivedMessageType = {}));
function handleMessage(msg) {
    switch (msg.type) {
        case ReceivedMessageType.DisplayToast: {
            if (msg.data.message.includes('booped you'))
                return handleBoop(msg.data);
            return;
        }
        case ReceivedMessageType.SpaceJoined: return handleJoinRoom(msg.data);
        case ReceivedMessageType.EntitiesChanged: {
            let dot = msg.data.users?.[0];
            let object = msg.data.objects?.[0];
            if (dot) { }
            if (object) {
                console.log(JSON.stringify(object));
            }
            return;
        }
    }
    ;
}
exports.handleMessage = handleMessage;
let handleBoop = ({ senderRoomId: roomId, highlightedText }) => {
    if (!roomId)
        return;
    let [username, roomName] = highlightedText;
    username = username?.replace('@', '') ?? null;
    api_1.events.emit('boop', {
        roomId,
        username,
        roomName,
    });
};
let handleJoinRoom = (data) => {
    let user = data.gameData.users.find(u => u.id === state_1.getState().userId) ?? errors_1.NoUserIdError();
    let x = user.position.x;
    let y = user.position.y;
    let moveId = user.moveId;
    let { users, objects } = data.gameData;
    state_1.updateState(state => state.room = {
        ...data.room,
        position: { x, y },
        entities: { users, objects },
    });
    state_1.updateState(state => state.moveId = moveId);
    api_1.events.emit('join_room', state_1.getState().room);
};
