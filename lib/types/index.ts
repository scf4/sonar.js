declare interface StateCheckResponse {
  state: 'ok' | 'block';
  message?: string;
}

declare interface AssetsResponse {
  emojiMappings: Emoji[];
  imageUrls: string[];
  soundUrls: string[];
  droppables: Record<string, Droppable>;
  strings: [];
  hash: string;
}

declare interface AuthVerificationResponse {
  user: AuthUser | null;
  onboardingUser: {
    onboardingStep: OnboardingStep
    onboardingAuthToken: string,
    isWaitlisted: boolean,
  } | null;
}

enum OnboardingStep {
  VerifyInviteCode = 'verify_invite_code',
  SetUsername = 'set_username',
}

declare interface Emoji {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  emojiSequence: string;
  url: string;
}

declare interface AuthUser {
  id: string;
  authToken: string;
  username: string;
}

declare interface ListRoomsResponse {
  rooms: Array<{
    id: number;
    title: string;
    subtitle: string;
    colorValues?: (number | null)[];
    colors?: (string | null)[];
    isPrivate: boolean;
    isRemovable: boolean;

    roomParticipantPreviews: Array<{
      color: string,
      userId: number,
      profileImageUrl: string;
      colorValue: number;
    }>;
  }>;
}

declare interface GetRoomResponse {
  creator:    User | null;
  moderators: User[];
  members:    User[];
  banned:     any[];
  isPrivate:  boolean;
}

declare interface CreateRoomResponse {
  room: {
    id: number;
    name: string;
    creatorId: number;
    isPublic?: null;
    organizationId?: unknown;
    headerImageUrl?: string;
    isDefault: boolean;
    createdAt: string;
    updatedAt: string;
  }
}

declare interface ListFriendsResponse {
  friends: User[];
  requests: FriendRequest[];
}

declare interface FriendRequest {
  id: number,
  username: string,
  color: string,
  colorValue: number,
  isOnline: boolean
}

declare interface Droppable {
  id: string;
  creatorId: number;
  lastActorId: number;
  orderId: 0;
  type: 'landmark' | '';
  name: string;
  position: { x: number; y: number }
  imageUrl: string;
  soundUrl: Maybe<string>;
  expiration: null;
  liftExpiration: number;
  radioStationState: unknown;
  isselfMuted: boolean;
  signText: Maybe<string>;
}

declare interface User {
  id: number;
  username: string;
  color: string;
  colorValue: number;
  moderationState?: Maybe<'none' | 'moderator'>;
  profileImageUrl?: Maybe<string>;
  currentRoomId?: Maybe<number>;
  isOnline: boolean;
  relationship: UserRelationship;
}

declare interface RoomUser extends User {
  role: 'member' | 'moderator' | 'creator';
  position: { x: number; y: number };
  moveId: number;
}

declare interface UserRelationship {
  friendshipStatus: 'friends' | 'needs_approval' | 'not_friends' | 'request_sent';
  isMuted: boolean;
  isBlocking: boolean;
  isBlockedBy: boolean;
  notificationSetting: NotificationSetting
}

type NotificationSetting = 'always' | 'occasionally' | 'never';

declare interface UserItemsResponse {
  invitation: {
    imageUrl: string;
    title: string;
  };
  badges: Array<{
    imageUrl: string;
    title: string;
    description: string;
    highlightedDescriptionTerms: string[];
  }>;
  addSocials?: {
    imageUrl: string;
    title: string;
    options: Array<{
      imageUrl: string;
      title: string;
      network: string;
      displayName: string;
    }>;
  };
  socials: unknown[];
}

declare interface GameData {
  users: RoomUser[];
  objects: Droppable[];
}

declare interface Room {
  id: number;
  name: string;
  creatorId: number;
  canModifyDroppables: boolean;
  droppablesModificationPermission: 'everyone' | 'creator_only';
  height: number;
  width: number;
  isPrivate: boolean;
}

declare interface CurrentRoom extends Room {
  position: {
    x: number;
    y: number;
  };
  entities: {
    objects: Droppable[];
    users: User[];
  };
}

declare interface BroadcastSpeakingData {
  type: string;
  requestId?: string | '';
  data: {
    userId: number;
    roomId: number;
    volume: number;
  }
}

declare interface UserChangedData {
  users: Maybe<User[]>;
  objects: null;
}

declare interface ObjectChangedData {
  users: null;
  objects: Maybe<any[]>;
}

declare interface DisplayToastData {
  message: string;
  highlightedText: string[];
  userId: Maybe<number>;
  senderRoomId: Maybe<number>;
  type: 'message',
}

declare interface SpaceJoinedData {
  room: Room;
  startingMoveId: number;
  isRejoin: boolean;
  gameData: GameData;
}

declare interface SearchUsersResponse {
  users: User[];
}