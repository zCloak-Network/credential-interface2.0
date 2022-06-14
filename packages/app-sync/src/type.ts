import { IMessageBody } from '@credential/app-db/MessageBody';

interface MessageType {
  id: number;
  ciphertext: string;
  nonce: string;
  senderKeyId: string;
  receiverKeyId: string;
}

export interface IDataSource {
  getMessage(
    id: number,
    senderKeyId?: string,
    receiverKeyId?: string,
    length?: number
  ): Promise<MessageType[]>;
}

export type ParserFunc = (encoded: {
  ciphertext: string;
  nonce: string;
  senderKeyId: string;
  receiverKeyId: string;
}) => Promise<IMessageBody>;
