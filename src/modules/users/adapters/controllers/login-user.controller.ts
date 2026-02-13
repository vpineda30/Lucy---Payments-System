import { Request, Response } from "express";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { LoginUserUseCase } from "../../app/use-cases/login-user.useCase.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import jwt from 'jsonwebtoken'
import 'dotenv/config'

export class LoginUserController {
    constructor(private readonly loginUserUseCase: LoginUserUseCase) { }

    public static build(): LoginUserController {
        const repository = new PrismaMySqlUserRepository()
        const loginUserUseCase = new LoginUserUseCase(repository);
        return new LoginUserController(loginUserUseCase)
    }

    public async handler(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const loginUser = await this.loginUserUseCase.execute({ email, password })
            const httpResponse: IHttpResponse<string> = {
                success: true,
                status: 201,
                response: loginUser
            }

            const { user } = loginUser
            const token = jwt.sign({ 
                id: user.id,
                email: user.email, 
                first_name: user.first_name
            }, process.env.JWT_SECRET_KEY!,{ expiresIn: '1d' });

            return response.status(httpResponse.status).json({ user: httpResponse.response, token: token})
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