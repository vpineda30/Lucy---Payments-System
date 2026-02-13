import { Request, RequestParamHandler, Response } from "express";
import { DeleteUserUseCase } from "../../app/use-cases/delete-user.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";

export class DeleteUserController {
    constructor(private readonly deleteUserUseCase: DeleteUserUseCase) { }

    public static build(): DeleteUserController {
        const repository = new PrismaMySqlUserRepository()
        const deleteUserUseCase = new DeleteUserUseCase(repository);
        return new DeleteUserController(deleteUserUseCase);
    }

    public async handler(request: Request<{ id: string }>, response: Response) {
        try {
            const { id } = request.params
            const deleteUser = await this.deleteUserUseCase.execute({ id })
            const httpResponse: IHttpResponse<any> = {
                success: true,
                status: 200,
                response: deleteUser
            }

            return response.status(httpResponse.status).json(httpResponse.response)
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