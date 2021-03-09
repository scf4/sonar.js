interface StateCheckResponse {
  state: 'ok' | 'block';
  message?: string;
}

interface AssetsResponse {
  emojiMappings: Emoji[];
  imageUrls: string[];
  soundUrls: string[];
  droppables: Record<string, Droppable>;
  strings: [];
  hash: string;
}

interface AuthVerificationResponse {
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

interface Droppable {
  imageUrl: string;
  soundId: number | null;
  soundUrl: Maybe<string>;
}

interface Emoji {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  emojiSequence: string;
  url: string;
}

interface AuthUser {
  id: string;
  authToken: string;
  username: string;
}

interface ListRoomsResponse {
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

interface GetRoomResponse {
  creator:    User | null;
  moderators: User[];
  members:    User[];
  banned:     any[];
  isPrivate:  boolean;
}

interface CreateRoomResponse {
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

interface ListFriendsResponse {
  friends: User[];
  requests: FriendRequest[];
}

interface FriendRequest {
  id: number,
  username: string,
  color: string,
  colorValue: number,
  isOnline: boolean
}

interface Droppable {
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

interface User {
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

interface RoomUser extends User {
  role: 'member' | 'moderator' | 'creator';
  position: { x: number; y: number };
  moveId: number;
}

interface UserRelationship {
  friendshipStatus: 'friends' | 'needs_approval' | 'not_friends' | 'request_sent';
  isMuted: boolean;
  isBlocking: boolean;
  isBlockedBy: boolean;
  notificationSetting: NotificationSetting
}

type NotificationSetting = 'always' | 'occasionally' | 'never';

interface UserItemsResponse {
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

interface GameData {
  users: RoomUser[];
  objects: Droppable[];
}

interface Room {
  id: number;
  name: string;
  creatorId: number;
  canModifyDroppables: boolean;
  droppablesModificationPermission: 'everyone' | 'creator_only';
  width: number;
  height: number;
  isPrivate: boolean;
}

interface Room {
  id: number;
  name: string;
  canModifyDroppables: Maybe<boolean>;
  droppablesModificationPermission: Maybe<boolean>;
  width: Maybe<number>;
  height: Maybe<number>;
  isPrivate: Maybe<boolean>;
}

interface BroadcastSpeakingData {
  type: string;
  requestId?: string | '';
  data: {
    userId: number;
    roomId: number;
    volume: number;
  }
}

interface UserChangedData {
  users: Maybe<User[]>;
  objects: null;
}

interface ObjectChangedData {
  users: null;
  objects: Maybe<any[]>;
}

interface DisplayToastData {
  message: string;
  highlightedText: string[];
  userId: Maybe<number>;
  senderRoomId: Maybe<number>;
  type: 'message',
}

interface SpaceJoinedData {
  data: Room;
  startingMoveId: number;
  isRejoin: boolean;
  gameData: GameData;
}

interface SearchUsersResponse {
  users: User[];
}