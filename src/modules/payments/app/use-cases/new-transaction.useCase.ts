import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { Transaction } from "../entities/transaction.entity.js";
import { ITransactionGateway } from "../gateways/transaction.gateway.js";

export type ITransactionInputDto = {
  senderId: string;
  receiverId: string;
  value: number;
};

export type ITransactionOutputDto = any;

export class NewTransactionUseCase implements UseCase<ITransactionInputDto, ITransactionOutputDto> {
  constructor(private readonly transactionGateway: ITransactionGateway) { }

  public async execute({ senderId, receiverId, value }: ITransactionInputDto): Promise<ITransactionOutputDto> {
    const transaction = Transaction.create(senderId, receiverId, value);
    const newtransaction = await this.transactionGateway.newTransaction(transaction);
    return this.output(newtransaction);
  }

  private output(transaction: Transaction): ITransactionOutputDto {
    return {
      message: "Transação Concluída.",
      Transaction: transaction,
    };
  }
}
