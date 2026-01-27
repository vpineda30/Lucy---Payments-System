import { Transaction } from "../entities/transaction.entity.js";

export interface ITransactionGateway {
  getAll(): Promise<Transaction[]>;
  getTransactionByReceiver(id: string): Promise<Transaction[]>;
  newTransaction(transaction: Transaction): Promise<Transaction>;
}
