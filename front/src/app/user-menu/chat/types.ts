export interface MessageDto {
  senderId: string;
  recieverId: string;
  message?: string;
  conversationId: number;
}

export interface NewConversationDto {
  productId: number;
  buyerId: string;
  sellerId: string;
  message: string;
}

export interface ConversationMessage {
  message?: string;
  senderId: string;
  date?: Date;
}
