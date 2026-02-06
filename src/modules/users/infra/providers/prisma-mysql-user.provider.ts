import { prisma } from "../../../../shared/database/prisma/prisma.js";
import { IUserContractGateway } from "../../app/gateways/user-contract.gateway.js";

export class PrismaMySqlUserProvider implements IUserContractGateway {
    public async findByCpf(cpf: string): Promise<{ id: string; email: string; } | null> {
        const user = await prisma.user.findUnique({
            where: { cpf: cpf },
            select: { id: true, email: true }
        })

        if (!user) return null

        return { id: user.id, email: user.email }
    }

    public async getBalance(id: string): Promise<{ email: string, balance: number; } | null> {
        const userBalance = await prisma.user.findUnique({
            where: { id: id }, select: { balance: true, email: true }
        })

        if (!userBalance?.balance) return null

        return { email: userBalance.email, balance: userBalance?.balance.toNumber() }
    }

    public async addBalance(id: string, value: number): Promise<{ balance: number; }> {
        const addReceiverBalance = await prisma.user.update({
            where: { id: id }, data: { balance: { increment: value } }
        })

        return { balance: addReceiverBalance.balance.toNumber() }
    }

    public async decreaseBalance(id: string, value: number): Promise<{ balance: number; }> {
        const addReceiverBalance = await prisma.user.update({
            where: { id: id }, data: { balance: { decrement: value } }
        })

        return { balance: addReceiverBalance.balance.toNumber() }
    }
}
