import { Request, Response } from "express";
import { GetUsersUseCase } from "../../app/use-cases/get-users.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";

export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) { }

  public async handler(request: Request, response: Response) {
    try {
      const users = await this.getUsersUseCase.execute();
      const httpResponse: IHttpResponse<any> = {
        success: true,
        status: 200,
        response: users,
      };
      return response.status(httpResponse.status).json(httpResponse.response);
    } catch (error) {
      throw new Error("Erro no Servidor. Tente Novamente.\n" + error);
    }
  }
}
