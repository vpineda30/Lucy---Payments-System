import { Request, Response } from "express";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { LoginUserUseCase } from "../../app/use-cases/login-user.useCase.js";

export class LoginUserController {
    constructor(private readonly loginUserUseCase: LoginUserUseCase) { }

    public async handler(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const loginUser = await this.loginUserUseCase.execute({ email, password })
            const httpResponse: IHttpResponse<string> = {
                success: true,
                status: 201,
                response: loginUser
            }
            return response.status(httpResponse.status).json(httpResponse.response)
        } catch (error) {
            throw new Error("Erro no Servidor. Tente novamente mais tarde.\n" + error)
        }
    }
}