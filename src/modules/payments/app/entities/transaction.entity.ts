import { randomUUID } from "node:crypto";

export interface ITransactionProps {
  id: string
  senderId: string 
  receiverId: string;
  value: number;
}

export class Transaction {
  constructor(private readonly props: ITransactionProps) {
    if (this.props.value < 0) {
      throw new Error("Valor Inválido. Tente um valor Positivo.");
    }
  }

  public static create(senderId: string, receiverId: string, value: number) {
    return new Transaction({
      id: randomUUID(),
      senderId,
      receiverId,
      value,
    })
  }

  public get id() {
    return this.props.id;
  }

  public get senderId() {
    return this.props.senderId;
  }

  public get receiverId() {
    return this.props.receiverId;
  }

  public get value() {
    return this.props.value;
  }
}
