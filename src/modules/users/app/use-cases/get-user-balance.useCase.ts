import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { IUserTransactionsGateway } from "../gateways/user-transactions.gateway.js";

type GetUserBalanceInput = {
    id: string
}

type GetUserBalanceOutput= {
    email: string
    balance: number
}

export class GetUserBalanceUseCase implements UseCase<GetUserBalanceInput, GetUserBalanceOutput> {
    constructor(private readonly userTransactionsGateway: IUserTransactionsGateway) {}

    public async execute({ id }: GetUserBalanceInput): Promise<GetUserBalanceOutput> {
        const userBalance = await this.userTransactionsGateway.getBalance(id)
        return this.output(userBalance)
    }

    private output({ email, balance }: GetUserBalanceOutput): GetUserBalanceOutput {
        return {
            email: email,
            balance: balance
        }
    }
}