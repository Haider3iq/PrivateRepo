import { ModelInit, MutableModel, PersistentModelConstructor } from "@aws-amplify/datastore";

export enum MessageStatus {
  SENT = "SENT",
  DELIVERED = "DELIVERED",
  READ = "READ"
}



type MommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SharesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type CommentMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type LikeMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type PostMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type BlockedUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FollowingMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type FollowerMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type SavedMessagesMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ReactionMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type MessageMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type UserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

type ChatRoomUserMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt';
}

export declare class Momment {
  readonly id: string;
  readonly Shares?: (Shares | null)[];
  readonly Comments?: (Comment | null)[];
  readonly Likes?: (Like | null)[];
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Momment, MommentMetaData>);
  static copyOf(source: Momment, mutator: (draft: MutableModel<Momment, MommentMetaData>) => MutableModel<Momment, MommentMetaData> | void): Momment;
}

export declare class Shares {
  readonly id: string;
  readonly mommentID?: string;
  readonly postID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Shares, SharesMetaData>);
  static copyOf(source: Shares, mutator: (draft: MutableModel<Shares, SharesMetaData>) => MutableModel<Shares, SharesMetaData> | void): Shares;
}

export declare class Comment {
  readonly id: string;
  readonly mommentID?: string;
  readonly postID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Comment, CommentMetaData>);
  static copyOf(source: Comment, mutator: (draft: MutableModel<Comment, CommentMetaData>) => MutableModel<Comment, CommentMetaData> | void): Comment;
}

export declare class Like {
  readonly id: string;
  readonly mommentID?: string;
  readonly postID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Like, LikeMetaData>);
  static copyOf(source: Like, mutator: (draft: MutableModel<Like, LikeMetaData>) => MutableModel<Like, LikeMetaData> | void): Like;
}

export declare class Post {
  readonly id: string;
  readonly Shares?: (Shares | null)[];
  readonly Comments?: (Comment | null)[];
  readonly Likes?: (Like | null)[];
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Post, PostMetaData>);
  static copyOf(source: Post, mutator: (draft: MutableModel<Post, PostMetaData>) => MutableModel<Post, PostMetaData> | void): Post;
}

export declare class BlockedUser {
  readonly id: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<BlockedUser, BlockedUserMetaData>);
  static copyOf(source: BlockedUser, mutator: (draft: MutableModel<BlockedUser, BlockedUserMetaData>) => MutableModel<BlockedUser, BlockedUserMetaData> | void): BlockedUser;
}

export declare class Following {
  readonly id: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Following, FollowingMetaData>);
  static copyOf(source: Following, mutator: (draft: MutableModel<Following, FollowingMetaData>) => MutableModel<Following, FollowingMetaData> | void): Following;
}

export declare class Follower {
  readonly id: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Follower, FollowerMetaData>);
  static copyOf(source: Follower, mutator: (draft: MutableModel<Follower, FollowerMetaData>) => MutableModel<Follower, FollowerMetaData> | void): Follower;
}

export declare class SavedMessages {
  readonly id: string;
  readonly content?: string;
  readonly senderName?: string;
  readonly senderID?: string;
  readonly userID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<SavedMessages, SavedMessagesMetaData>);
  static copyOf(source: SavedMessages, mutator: (draft: MutableModel<SavedMessages, SavedMessagesMetaData>) => MutableModel<SavedMessages, SavedMessagesMetaData> | void): SavedMessages;
}

export declare class Reaction {
  readonly id: string;
  readonly userID?: string;
  readonly content?: string;
  readonly messageID?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Reaction, ReactionMetaData>);
  static copyOf(source: Reaction, mutator: (draft: MutableModel<Reaction, ReactionMetaData>) => MutableModel<Reaction, ReactionMetaData> | void): Reaction;
}

export declare class Message {
  readonly id: string;
  readonly content?: string;
  readonly userID?: string;
  readonly chatroomID?: string;
  readonly image?: string;
  readonly audio?: string;
  readonly status?: MessageStatus | keyof typeof MessageStatus;
  readonly replyToMessageID?: string;
  readonly Reactions?: (Reaction | null)[];
  readonly isSelected?: boolean;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<Message, MessageMetaData>);
  static copyOf(source: Message, mutator: (draft: MutableModel<Message, MessageMetaData>) => MutableModel<Message, MessageMetaData> | void): Message;
}

export declare class ChatRoom {
  readonly id: string;
  readonly newMessages?: number;
  readonly LastMessage?: Message;
  readonly Messages?: (Message | null)[];
  readonly ChatRoomUser?: (ChatRoomUser | null)[];
  readonly Admin?: User;
  readonly name?: string;
  readonly imageUri?: string;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  readonly chatRoomLastMessageId?: string;
  readonly chatRoomAdminId?: string;
  constructor(init: ModelInit<ChatRoom, ChatRoomMetaData>);
  static copyOf(source: ChatRoom, mutator: (draft: MutableModel<ChatRoom, ChatRoomMetaData>) => MutableModel<ChatRoom, ChatRoomMetaData> | void): ChatRoom;
}

export declare class User {
  readonly id: string;
  readonly name: string;
  readonly imageUri?: string;
  readonly status?: string;
  readonly lastOnlineAt?: number;
  readonly typingStatus?: string;
  readonly Messages?: (Message | null)[];
  readonly chatrooms?: (ChatRoomUser | null)[];
  readonly color?: string;
  readonly SavedMessages?: (SavedMessages | null)[];
  readonly offline?: boolean;
  readonly Momments?: (Momment | null)[];
  readonly Posts?: (Post | null)[];
  readonly BlockedUsers?: (BlockedUser | null)[];
  readonly Followings?: (Following | null)[];
  readonly Followers?: (Follower | null)[];
  readonly Shares?: (Shares | null)[];
  readonly Comments?: (Comment | null)[];
  readonly Likes?: (Like | null)[];
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<User, UserMetaData>);
  static copyOf(source: User, mutator: (draft: MutableModel<User, UserMetaData>) => MutableModel<User, UserMetaData> | void): User;
}

export declare class ChatRoomUser {
  readonly id: string;
  readonly chatroom: ChatRoom;
  readonly user: User;
  readonly createdAt?: string;
  readonly updatedAt?: string;
  constructor(init: ModelInit<ChatRoomUser, ChatRoomUserMetaData>);
  static copyOf(source: ChatRoomUser, mutator: (draft: MutableModel<ChatRoomUser, ChatRoomUserMetaData>) => MutableModel<ChatRoomUser, ChatRoomUserMetaData> | void): ChatRoomUser;
}