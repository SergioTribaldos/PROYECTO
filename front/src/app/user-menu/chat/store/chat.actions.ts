import { createAction } from '@ngrx/store';

export const CHAT_ACTIONS = {
  addMessageRecieved: createAction('[App] Add Message recieved'),
  resetMessagesRecieved: createAction('[App] Reset Message recieved'),
};
