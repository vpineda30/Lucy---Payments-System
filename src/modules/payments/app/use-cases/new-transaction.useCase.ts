import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { IUserTransactionsGateway } from "../../../users/app/gateways/user-transactions.gateway.js";
import { Transaction } from "../entities/transaction.entity.js";
import { ITransactionGateway } from "../gateways/transaction.gateway.js";

export type ITransactionInputDto = {
  senderId: string;
  receiverCpf: string;
  value: number;
};

export type ITransactionOutputDto = any;

export class NewTransactionUseCase implements UseCase<ITransactionInputDto, ITransactionOutputDto> {
  constructor(private readonly transactionGateway: ITransactionGateway, private readonly userTransactionsGateway: IUserTransactionsGateway) { }

  public async execute({ senderId, receiverCpf, value }: ITransactionInputDto): Promise<ITransactionOutputDto> {
    const receiver = await this.userTransactionsGateway.findByCpf(receiverCpf)

    if(!receiver) {
      throw new Error("Esse CPF não Existe. Tente Novamente.")
    }

    const transaction = Transaction.create(senderId, receiver.id, value);
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
