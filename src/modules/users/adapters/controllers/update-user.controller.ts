import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { UpdateUserUseCase } from "../../app/use-cases/update-user.useCase.js";
import { Request, Response } from "express";
import { LoginUserController } from "./login-user.controller.js";

export class UpdateUserController {
    constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}

    public static build(): UpdateUserController {
        const updateUserUseCase = UpdateUserUseCase.build();
        return new UpdateUserController(updateUserUseCase);
    }

    public async handler(request: Request<{ id: string }>, response: Response) {
        try {
            const { id } = request.params
            const data = request.body
            const updateUser = await this.updateUserUseCase.execute({ id, data })
            const httpResponse: IHttpResponse<any> = {
                success: true,
                status: 200,
                response: updateUser
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