interface StateCheckResponse {
  state: 'ok' | 'block';
  message?: string;
}

interface AssetsResponse {
  droppables: Record<string, Droppable>;
  emojiMappings: Emoji[];
  imageUrls: string[];
  soundUrls: string[];
  strings: [];
  hash: string;
}

type Assets = Omit<AssetsResponse, 'droppables'> & {
  droppables: Map<string, Droppable>;
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

interface Room {
  id: number;
  name: string;
  height: number;
  width: number;
  creatorId: number;
  isPrivate: boolean;
  canModifyDroppables: boolean;
  droppablesModificationPermission: 'everyone' | 'creator_only';
  headerImageUrl?: string;
}

interface SearchUsersResponse {
  users: User[];
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
  last_actorId: number;
  orderId: 0;
  type: 'landmark' | '';
  name: string;
  position: {
    x: number;
    y: number;
  },
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
  moderationState: string;
  profileImageUrl: string;
  currentRoomId: number;
  isOnline: boolean;
  relationship: UserRelationship;

  position?: {
    x: number;
    y: number;
  },

  moveId?: number;
  role?: 'creator';
}

interface UserRelationship {
  friendshipStatus: 'friends' | 'needs_approval' | 'not_friends' | 'request_sent';
  isMuted: boolean;
  isBlocking: boolean;
  isBlockedBy: boolean;
  notificationSetting: string;
}

interface GameData {
  users: User[];
  objects: Droppable[];
}

interface SpaceJoinedData {
  data: Room;
  startingMoveId: number;
  isRejoin: boolean;
  gameData: GameData;
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
  type: 'message',
  message: string;
  highlightedText: [username: string, roomName: string];
  senderRoomId: number | null;
  userId: null;
}