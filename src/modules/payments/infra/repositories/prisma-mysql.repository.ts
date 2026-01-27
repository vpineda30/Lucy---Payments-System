import { prisma } from "../../../../shared/database/prisma/prisma.js";
import { Transaction } from "../../app/entities/transaction.entity.js";
import { ITransactionGateway } from "../../app/gateways/transaction.gateway.js";

export class PrismaTransactionRepository implements ITransactionGateway {
  public async getAll(): Promise<Transaction[]> {
    const transaction = await prisma.transaction.findMany();
    return transaction.map((t) => {
      return new Transaction({
        id: t.id,
        senderId: t.senderId,
        receiverId: t.receiverId,
        value: t.value.toNumber(),
      });
    });
  }

  public async getTransactionByReceiver(id: string): Promise<Transaction[]> {
    const transaction = await prisma.transaction.findMany({ where: { receiverId: id } })

    if (!transaction) {
      throw new Error("Transação não encontrada");
    }

    return transaction.map((t) => {
      return new Transaction({
        id: t.id,
        senderId: t.senderId,
        receiverId: t.receiverId,
        value: t.value.toNumber()
      })
    })
  }

  public async newTransaction(transaction: Transaction): Promise<Transaction> {
    const newTransaction = await prisma.transaction.create({
      data: {
        senderId: transaction.senderId,
        receiverId: transaction.receiverId,
        value: transaction.value,
      },
    });

    return new Transaction({
      id: newTransaction.id,
      senderId: newTransaction.senderId,
      receiverId: newTransaction.receiverId,
      value: newTransaction.value.toNumber(),
    });
  }
}
