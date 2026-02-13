import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { IUserContractGateway } from "../../../users/app/gateways/user-contract.gateway.js";
import { Transaction } from "../entities/transaction.entity.js";
import { ITransactionGateway } from "../gateways/transaction.gateway.js";

export type ITransactionInputDto = {
  senderId: string;
  receiverCpf: string;
  value: number;
};

export type ITransactionOutputDto = any;

export class NewTransactionUseCase implements UseCase<ITransactionInputDto, ITransactionOutputDto> {
  constructor(private readonly transactionGateway: ITransactionGateway, private readonly userTransactionsGateway: IUserContractGateway) {}

  public async execute({ senderId, receiverCpf, value }: ITransactionInputDto): Promise<ITransactionOutputDto> {
    const receiver = await this.userTransactionsGateway.findByCpf(receiverCpf);
    const senderBalance = await this.userTransactionsGateway.getBalance(senderId);

    if (!receiver) throw new Error("Esse CPF não Existe. Tente Novamente.");
    if (!senderBalance || senderBalance.balance < value) throw new Error("Sem Saldo.");
    if (senderId === receiver.id) throw new Error("As transações não podem ser enviadas para si mesmo.");

    await this.userTransactionsGateway.addBalance(receiver.id, value);
    await this.userTransactionsGateway.decreaseBalance(senderId, value);

    const transaction = Transaction.create(senderId, receiver.id, value);
    const createtransaction = await this.transactionGateway.newTransaction(transaction);

    if (!createtransaction) throw new Error("Transação não concluída. Tente Novamente.");

    return this.output(createtransaction);
  }

  private output(transaction: Transaction): ITransactionOutputDto {
    return {
      message: "Transação Concluída.",
      Transaction: {
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        value: transaction.value,
      }
    };
  }
}
