declare let current: () => any;
declare let join: any;
declare let list: () => any;
declare let create: () => any;
declare let rename: (roomId: number, name: string) => any;
declare let remove: (roomId: number) => any;
declare let invite: (roomId: number, userId: number) => any;
declare let uninvite: (roomId: number, userId: number) => any;
declare let uninvitedFriends: (roomId: number) => any;
declare let ban: (roomId: number, userId: number) => any;
declare let unban: (roomId: number, userId: number) => any;
declare let addModerator: (roomId: number, userId: number) => any;
declare let removeModerator: (roomId: number, userId: number) => any;
declare let lockEditing: (roomId: number) => any;
declare let unlockEditing: (roomId: number) => any;
declare let lock: (roomId: number) => any;
declare let unlock: (roomId: number) => any;
declare let meta: (roomId: number) => any;
declare let moderators: (roomId: number) => any;
declare let members: (roomId: number) => any;
declare let bannedUsers: (roomId: number) => any;
export { current, list, join, create, rename, remove, lock, unlock, invite, uninvite, uninvitedFriends, bannedUsers, members, moderators, ban, unban, addModerator, removeModerator, lockEditing, unlockEditing, meta, };
