import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { User } from "../entities/user.entity.js";
import { IUserGateway } from "../gateways/user.gateway.js";

type createUserInputDto = {
    first_name: string
    last_name: string
    email: string
    cpf: string
    password: string
    confirm_password: string
}

type createUserOutputDto = any

export class CreateUserUseCase implements UseCase<createUserInputDto, createUserOutputDto> {
    constructor(private readonly userGateway: IUserGateway) { }

    public async execute(data: createUserInputDto): Promise<createUserOutputDto> {
        const user = User.create(data.first_name, data.last_name, data.email, data.cpf, data.password, data.confirm_password)
        const createUser = await this.userGateway.create(user)
        return this.output(createUser)
    }

    private output(user: User): createUserOutputDto {
        return {
            message: "Usuário Criado com sucesso.",
            "user": user
        }
    }
}