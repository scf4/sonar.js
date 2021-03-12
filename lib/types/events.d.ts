export declare type Assets = Omit<AssetsResponse, 'droppables'> & {
    droppables: Map<string, Droppable>;
};
export declare interface GameMessageEvent {
    join_room: (data: JoinRoomPayload) => void;
    boop: (data: BoopPayload) => void;
    friend_request: (data: FriendRequest) => void;
    user_join: (data: User) => void;
    user_leave: (data: User) => void;
    user_move: (data: User) => void;
    user_text: (data: User) => void;
    user_horn: (data: User) => void;
    user_self_mute: (data: User) => void;
    user_self_unmute: (data: User) => void;
}
export declare type JoinRoomPayload = Room & {
    entities: {
        users: User[];
        objects: Droppable[];
    };
};
export interface BoopPayload {
    roomId: number;
    roomName: string;
    username: string;
}
