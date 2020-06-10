import { ChatState } from './chat.reducers';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectChatState = createFeatureSelector<ChatState>('Chat');

export const getUnreadMessages = createSelector(selectChatState, (chat) => {
  return chat.unreadMessages;
});
