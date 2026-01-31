import { prisma } from "../../../../shared/database/prisma/prisma.js";
import { IUserTransactionsGateway } from "../../app/gateways/user-transactions.gateway.js";

export class PrismaMySqlUserTransactionsRepository implements IUserTransactionsGateway {
    public async findByCpf(cpf: string): Promise<{ id: string; email: string; }> {
        const user = await prisma.user.findUnique({
            where: { cpf: cpf },
            select: { id: true, email: true }
        })

        if (!user) throw new Error("CPF inválido. Tente Novamente.")

        return { id: user.id, email: user.email }
    }

    public async getBalance(id: string): Promise<{ balance: number; }> {
        const userBalance = await prisma.user.findUnique({
            where: { id: id }, select: { balance: true }
        })

        if(!userBalance?.balance) throw new Error("Sem saldo." + userBalance)

        return { balance: userBalance?.balance.toNumber() }
    }

    public async updateBalance(id: string, value: number): Promise<{ balance: number; }> {
        const updateBalance = await prisma.user.update({ 
            where: { id: id }, data: { value: value }
        })
        
        return { balance: updateBalance.balance.toNumber() }
    }
}
