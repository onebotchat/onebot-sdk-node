// cspell_disable-file
import { Account, Contact, Conversation, FriendApplication, Group, Message, User } from './models';

export interface Event<T> {
  // 事件数据
  data: T;
  // 事件类型
  type: string;
}

export enum OneBotEventType {
  // 账号在线状态变化
  ACCOUNT_PRESENCE_UPDATED = 'account_presence_updated',
  // 账号总未读数量变化
  ACCOUNT_UNREAD_COUNT_UPDATED = 'account_unread_count_updated',
  // 账号资料更新
  ACCOUNT_UPDATED = 'account_updated',
  // 添加了新好友
  CONTACT_ADDED = 'contact_added',
  // 收到会话
  CONVERSATION_UPDATED = 'conversation_updated',
  // 收到好友申请
  FRIEND_APPLICATION_RECEIVED = 'friend_application_received',
  // 加入了新群组
  GROUP_JOINED = 'group_joined',
  // 收到新消息
  MESSAGE_RECEIVED = 'message_received',
  // 消息被撤回
  MESSAGE_REVOKED = 'message_revoked',
}

// 收到新消息
export type MessageReceivedEvent = Event<{
  account: User
  conversation: Conversation
  message: Message
}>;

// 消息被撤回
export type MessageRevokedEvent = Event<Message>;
// 收到会话
export type ConversationUpdatedEvent = Event<Conversation>;
// 加入了新群组
export type GroupJoinedEvent = Event<Group>;
// 账号资料更新
export type AccountUpdatedEvent = Event<Account>;
// 账号在线状态变化
export type AccountPresenceUpdatedEvent = Event<Pick<Account, 'id' | 'presence'>>;
// 账号总未读数量变化
export type AccountUnreadCountUpdatedEvent = Event<Pick<Account, 'id' | 'unread'>>;
// 添加了新好友
export type ContactAddedEvent = Event<Contact>;
// 收到好友申请
export type FriendApplicationReceivedEvent = Event<FriendApplication>;

export type OneBotEvent =
  | MessageReceivedEvent
  | MessageRevokedEvent
  | ConversationUpdatedEvent
  | GroupJoinedEvent
  | AccountUpdatedEvent
  | AccountPresenceUpdatedEvent
  | AccountUnreadCountUpdatedEvent
  | ContactAddedEvent
  | FriendApplicationReceivedEvent;

export type EventHandler = (evt: any) => void;
