declare enum ReceivedMessageType {
    SpaceJoined = "space_joined",
    SpaceChanged = "space_changed",
    AudioChannelSubscriptionsUpdated = "audio_channel_subscriptions_updated",
    DisplayToast = "display_toast",
    GameObjects = "game_objects",
    EntitiesChanged = "entities_changed",
    EntitiesDespawned = "entities_despawned",
    EntitiesSpawned = "entities_spawned",
    DroppablesLifted = "droppables_lifted",
    DroppablesDropped = "droppables_dropped",
    DroppablesPlaced = "droppables_placed",
    BroadcastSpeaking = "broadcast_speaking",
    Horn = "horn"
}
export declare type ReceivedMessage = {
    type: ReceivedMessageType.SpaceJoined;
    data: SpaceJoinedData;
} | {
    type: ReceivedMessageType.SpaceChanged;
    data: any;
} | {
    type: ReceivedMessageType.DisplayToast;
    data: DisplayToastData;
} | {
    type: ReceivedMessageType.BroadcastSpeaking;
    data: BroadcastSpeakingData;
} | {
    type: ReceivedMessageType.EntitiesChanged;
    data: UserChangedData;
} | {
    type: ReceivedMessageType.EntitiesChanged;
    data: ObjectChangedData;
};
declare function handleMessage(msg: ReceivedMessage): any;
export { handleMessage };
