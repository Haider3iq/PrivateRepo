// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';

const MessageStatus = {
  "SENT": "SENT",
  "DELIVERED": "DELIVERED",
  "READ": "READ"
};

const { Momment, Shares, Comment, Like, Post, BlockedUser, Following, Follower, SavedMessages, Reaction, Message, ChatRoom, User, ChatRoomUser } = initSchema(schema);

export {
  Momment,
  Shares,
  Comment,
  Like,
  Post,
  BlockedUser,
  Following,
  Follower,
  SavedMessages,
  Reaction,
  Message,
  ChatRoom,
  User,
  ChatRoomUser,
  MessageStatus
};