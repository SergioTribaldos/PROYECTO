import { createReducer, on } from '@ngrx/store';
import { CHAT_ACTIONS } from './chat.actions';

export interface ChatState {
  unreadMessages: number;
}

export const initialChatState: ChatState = {
  unreadMessages: undefined,
};

export const chatReducer = createReducer(
  initialChatState,
  on(CHAT_ACTIONS.addMessageRecieved, (state, action) => {
    return {
      unreadMessages: !state.unreadMessages ? 1 : state.unreadMessages + 1,
    };
  }),
  on(CHAT_ACTIONS.resetMessagesRecieved, (state, action) => {
    return {
      unreadMessages: undefined,
    };
  })
);
