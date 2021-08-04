export interface LaunchResponse {
  stateCheck: {
    state: 'ok' | 'block';
    message?: string;
  };
  loginInfo: {
    user: {
      id: number;
      username: string;
      color: string;
      colors: string[];
      colorValue: number;
      moderationState: 'none' | unknown;
      profileImageUrl: string | null;
      currentRoomId: number | null;
      isOnline: boolean;
      relationship: {
        friendshipStatus: string,
        isMuted: boolean;
        isBlocking: boolean;
        isBlockedBy: boolean;
        isBestFriend: boolean;
        notificationSetting: '';
      };
      displayAsBestFriend: boolean;
      lastSeenAt: number | null;
    };
    authToken?: string;
    flags: {
      isHigherAudioQualityEnabled: boolean;
      isV111AgoraChangesEnabled: boolean;
      reducedHornSpamEnabled: boolean;
    };
    referralCode: string;
  }
}

export interface AssetsResponse {
  emojiMappings: Emoji[];
  imageUrls: string[];
  soundUrls: string[];
  droppables: Record<string, ObjectEntity>;
  strings: [];
  hash: string;
}

export type Assets = Omit<AssetsResponse, 'droppables'> & {
  droppables: Map<string, ObjectEntity>;
};

export interface AuthVerificationResponse {
  user: AuthUser | null;
  onboardingUser: {
    onboardingStep: OnboardingStep;
    onboardingAuthToken: string;
    isWaitlisted: boolean;
  } | null;
}

enum OnboardingStep {
  VerifyInviteCode = 'verify_invite_code',
  SetUsername = 'set_username',
}

export interface Emoji {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  emojiSequence: string;
  url: string;
}

export interface AuthUser {
  id: string;
  authToken: string;
  username: string;
}

export interface ListRoomsResponse {
  rooms: {
    id: number;
    title: string;
    subtitle: string;
    colorValues: [number?, number?];
    colors: [string?, string?];
    isPrivate: boolean;
    isRemovable: boolean;
    isLocationBased: boolean;
    roomParticipantPreviews: Array<{
      userId: number;
      profileImageUrl: string;
      color: string;
      colorValue: number;
    }>;
  }[];
}

export interface GetRoomResponse {
  creator: User | null;
  moderators: User[];
  members: User[];
  banned: User[];
  isPrivate: boolean;
  shareUrl: string;
}

export interface CreateRoomResponse {
  id: number;
  name: string;
  creatorId: number;
  isPublic?: null;
  organizationId?: unknown;
  headerImageUrl: Maybe<string>;
  isTutorialTemplate: boolean;
  isLockedDown: boolean;
  numOnlineUsers: number;
  isDefault: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ListFriendsResponse {
  friends: User[];
  requests: FriendRequest[];
}

export interface FriendRequest {
  id: number;
  username: string;
  color: string;
  // colorValue: number;
  isOnline: boolean;
}

export interface FriendRequestResponse {
  friendshipStatus?: 'request_sent';
}

export interface ObjectEntity {
  id: string;
  creatorId: number;
  lastActorId: number;
  orderId: number;
  type: 'landmark' | 'pickup';
  name: string;
  position: { x: number; y: number };
  imageUrl: string;
  soundUrl: Maybe<string>;
  expiration: null;
  liftExpiration: number;
  radioStationState: unknown;
  isSelfMuted: boolean;
  signText: Maybe<string>;
}

export interface User {
  id: number;
  username: string;
  profileImageUrl?: Maybe<string>;
  color: string;
  // colorValue: number;
  moderationState?: Maybe<'none' | 'moderator'>;
  currentRoomId?: Maybe<number>;
  isOnline: boolean;
  relationship: UserRelationship;
}

export interface RoomUser extends User {
  role: 'member' | 'moderator' | 'creator';
  position: { x: number; y: number };
  moveId: number;
  profileImageUrlChanged: boolean;
  isSelfMuted: boolean;
  statusText: string;
}

export interface UserRelationship {
  friendshipStatus: 'friends' | 'needs_approval' | 'not_friends' | 'request_sent';
  isMuted: boolean;
  isBlocking: boolean;
  isBlockedBy: boolean;
  isBestFriend: boolean;
  notificationSetting: NotificationSetting;
}

export type NotificationSetting = 'always' | 'occasionally' | 'never';

export interface SpaceChangedData {
  data: {
    // Todo
  };
}

export interface UserItemsResponse {
  invitation: Maybe<{
    imageUrl: string;
    title: string;
  }>;
  badges: Array<{
    imageUrl: string;
    title: string;
    description: string;
    highlightedDescriptionTerms: string[];
  }>;
  coin: {
    imageUrl: string;
    title: string;
    description: string;
    highlightedDescriptionTerms: string[];
    count: number;
  } | null;
  addSocial: Maybe<{
    imageUrl: string;
    title: 'Add Social';
    options: Array<{
      title: string;
      displayName: string;
      imageUrl: string;
      network: SocialNetwork;
    }>;
  }>;
  socials: Array<{
    imageUrl: string;
    title: string;
    link: string;
    network: string;
    username: string;
    options: {
      imageUrl: string;
      title: string;
      link: string;
      network: SocialNetwork;
      username: string;
    }[];
  }>;
  bestFriends: {
    title: string;
    friends: Pick<User, 'id' | 'username' | 'profileImageUrl' | 'color'>[];
    friendsCount: number;
  }
}

export type SocialNetwork = 'instagram' | 'discord' | 'twitter' | 'snapchat' | 'tiktok';

export interface GameData {
  users: RoomUser[];
  objects: ObjectEntity[];
}

export interface Room {
  id: number;
  name: string;
  creatorId: number;
  headerImageUrl: Maybe<string>;
  height: number;
  width: number;
  mode: 'public' | 'private' | 'party';
  isPrivate: boolean;
  canModifyDroppables: boolean;
  droppablesModificationPermission: 'everyone' | 'creator_only';
  isHomeServer: boolean;
  isLocationBased: boolean;
}

export interface CurrentRoomPayload extends Room {
  position: {
    x: number;
    y: number;
  };
  entities: {
    objects: ObjectEntity[];
    users: User[];
  };
}

export interface BroadcastSpeakingData {
  type: string;
  requestId?: string | '';
  data: {
    userId: number;
    roomId: number;
    volume: number;
  };
}

export interface EntityChangedData {
  users: Maybe<RoomUser[]>;
  objects: Maybe<any[]>;
}

export interface EntityChangedData {
  users: Maybe<RoomUser[]>;
  objects: Maybe<any[]>;
}

export interface DisplayToastData {
  message: string;
  highlightedText: string[];
  userId: Maybe<number>;
  senderRoomId: Maybe<number>;
  type: 'message';
}

export interface SpaceJoinedData {
  room: Room;
  startingMoveId: number;
  isRejoin: boolean;
  gameData: GameData;
}

export interface ServerInviteData { 
  roomId: number;
  roomName: string;
  username: string;
}

export interface DroppablesDroppedData {
  gameObjects: Array<ObjectEntity>
}

// export interface FriendRequestData {}
