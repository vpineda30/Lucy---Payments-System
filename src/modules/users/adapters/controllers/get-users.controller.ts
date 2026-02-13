import { Request, Response } from "express";
import { GetUsersUseCase } from "../../app/use-cases/get-users.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";

export class GetUsersController {
  constructor(private readonly getUsersUseCase: GetUsersUseCase) { }

  public static build(): GetUsersController {
    const repository = new PrismaMySqlUserRepository()
    const getUserUseCase = new GetUsersUseCase(repository);
    return new GetUsersController(getUserUseCase);
  }

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
      const httpResponse: IHttpResponse<string> = {
        success: false,
        status: 400,
        response: "Erro no Servidor. Tente novamente mais tarde.\n " + error,
      };
      return response.status(httpResponse.status).json(httpResponse.response);
    }
  }
}
