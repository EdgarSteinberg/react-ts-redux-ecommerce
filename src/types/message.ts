export type MessageType = 'success' | 'error';

export interface Message {
  type: MessageType;
  text: string;
}