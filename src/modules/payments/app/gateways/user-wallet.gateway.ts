export interface IUserTransactionsGateway {
    findByCpf(cpf: string): Promise<{ id: string, email: string } | null>
    getBalance(id: string): Promise<{ email: string, balance: number } | null>
    addBalance(id: string, value: number): Promise<{ balance: number }>
    decreaseBalance(id: string, value: number): Promise<{ balance: number }>
}