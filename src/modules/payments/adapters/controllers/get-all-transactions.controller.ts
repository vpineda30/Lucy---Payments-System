import { Request, Response } from "express";
import { GetAllTransactionsUseCase } from "../../app/use-cases/get-transactions.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { PrismaMySqlTransactionRepository } from "../../infra/repositories/prisma-mysql-transactions.repository.js";

export class GetAllTransactionsController {
  constructor(private readonly getAllTransactionsUseCase: GetAllTransactionsUseCase) {}

  public static build(): GetAllTransactionsController {
      const repository = new PrismaMySqlTransactionRepository();
      const getAllTransactionsUseCase = new GetAllTransactionsUseCase(repository);
      return new GetAllTransactionsController(getAllTransactionsUseCase);
    }

  public async handler(request: Request, response: Response) {
    try {
      const transactions = await this.getAllTransactionsUseCase.execute();
      const httpResponse: IHttpResponse<any> = {
        success: true,
        status: 200,
        response: transactions,
      }
      return response.status(httpResponse.status).json(httpResponse.response);
    } catch (error) {
      const httpResponse: IHttpResponse<string> = {
        success: false,
        status: 400,
        response: "Erro no Servidor. Tente novamente mais tarde.\n " + error
      }
      return response.status(httpResponse.status).json(httpResponse.response);
    }
  }
}
