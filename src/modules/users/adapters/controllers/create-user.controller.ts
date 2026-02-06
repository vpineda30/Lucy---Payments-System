import { Request, Response } from "express";
import { CreateUserUseCase } from "../../app/use-cases/create-user.useCase.js";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { User } from "../../app/entities/user.entity.js";

export class CreateUserController {
    constructor(private readonly createUserUseCase: CreateUserUseCase) { }

    public static build(): CreateUserController {
        const createUserUseCase = CreateUserUseCase.build();
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