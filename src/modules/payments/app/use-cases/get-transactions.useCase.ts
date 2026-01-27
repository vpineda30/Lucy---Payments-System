import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { Transaction } from "../entities/transaction.entity.js";
import { ITransactionGateway } from "../gateways/transaction.gateway.js";

type TransactionInput = void;

type TransactionOutput = {
  id: string;
  sender: string;
  receiver: string;
  value: number;
}[];

export class GetAllTransactionsUseCase implements UseCase<
  TransactionInput,
  TransactionOutput
> {
  constructor(private readonly transactionGateway: ITransactionGateway) { }

  public async execute(): Promise<TransactionOutput> {
    const transactions = await this.transactionGateway.getAll();
    return this.output(transactions);
  }

  private output(transaction: Transaction[]): TransactionOutput {
    const allTransactions = transaction.map((t) => {
      return new Transaction({
        id: t.id,
        sender: t.sender,
        receiver: t.receiver,
        value: t.value,
      });
    });

    return allTransactions;
  }
}
