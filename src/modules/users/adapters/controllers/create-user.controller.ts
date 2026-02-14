import { Request, Response } from "express";
import { CreateUserUseCase } from "../../app/use-cases/create-user.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { User } from "../../app/entities/user.entity.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import jwt from 'jsonwebtoken';
import "dotenv/config";

export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    public static build(): CreateUserController {
        const repository = new PrismaMySqlUserRepository()
        const createUserUseCase = new CreateUserUseCase(repository);
        return new CreateUserController(createUserUseCase);
    }

    public async handler(request: Request, response: Response) {
        try {
            const { first_name, last_name, email, cpf, password, confirm_password } = request.body;
            const createUser = await this.createUserUseCase.execute({ first_name, last_name, email, cpf, password, confirm_password })
            const httpResponse: IHttpResponse<User> = {
                success: true,
                status: 201,
                response: createUser
            }

            const { user } = createUser;
            const token = jwt.sign({
                id: user.id,
                email: user.email,
                first_name: user.first_name
            }, process.env.JWT_SECRET_KEY!, { expiresIn: '1d' });
            
            return response.status(httpResponse.status).json({ user: httpResponse.response, token })
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