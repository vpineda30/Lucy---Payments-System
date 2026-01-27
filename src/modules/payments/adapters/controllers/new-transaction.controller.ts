import { Request, Response } from "express";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { NewTransactionUseCase } from "../../app/use-cases/new-transaction.useCase.js";

export class NewTransactionsController {
  constructor(private readonly newTransactionsUseCase: NewTransactionUseCase) { }

  public async handler(request: Request, response: Response) {
    try {
      const { senderId, receiverId, value } = request.body;
      const newTransaction = await this.newTransactionsUseCase.execute({ senderId, receiverId, value });
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
