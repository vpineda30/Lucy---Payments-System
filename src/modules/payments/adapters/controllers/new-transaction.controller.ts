import { Request, Response } from "express";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { NewTransactionUseCase } from "../../app/use-cases/new-transaction.useCase.js";
import { PrismaMySqlTransactionRepository } from "../../infra/repositories/prisma-mysql-transactions.repository.js";
import { PrismaMySqlUserProvider } from "../../../users/infra/providers/prisma-mysql-user.provider.js";

export class NewTransactionsController {
  constructor(private readonly newTransactionsUseCase: NewTransactionUseCase) { }

  public static build(): NewTransactionsController {
    const repository = new PrismaMySqlTransactionRepository();
    const provider = new PrismaMySqlUserProvider()
    const newTransactionsUseCase = new NewTransactionUseCase(repository, provider);
    return new NewTransactionsController(newTransactionsUseCase);
  }

  public async handler(request: Request, response: Response) {
    try {
      const { senderCpf, receiverCpf, value } = request.body;
      const newTransaction = await this.newTransactionsUseCase.execute({ senderCpf, receiverCpf, value });
      const httpResponse: IHttpResponse<any> = {
        success: true,
        status: 201,
        response: newTransaction,
      };

      return response.status(httpResponse.status).json(httpResponse.response);
    } catch (error) {
      const httpResponse: IHttpResponse<string> = {
        success: false,
        status: 400,
        response: "Erro no Servidor. Tente novamente mais tarde.\n " + error
      }
      return response.status(httpResponse.status).json(httpResponse.response)
    }
  }
}
