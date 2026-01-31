export interface IUserTransactionsGateway {
    findByCpf(cpf: string): Promise<{ id: string, email: string }>
    getBalance(id: string): Promise<{ email: string, balance: number }>
    updateBalance(id: string, value: number): Promise<{ balance: number }>
}