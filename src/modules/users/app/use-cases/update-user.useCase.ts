import { IUserGateway } from "../gateways/user.gateway.js";
import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { User } from "../entities/user.entity.js";

type updateUserInputDto = {
    id: string
    data: {
        first_name: string
        last_name: string
        email: string
        cpf: string
        password: string
        confirm_password: string
    }
}

type updateUserOutputDto = any

export class UpdateUserUseCase implements UseCase<updateUserInputDto, updateUserOutputDto> {
    constructor(private readonly userGateway: IUserGateway) { }

    public async execute({ id, data }: updateUserInputDto): Promise<updateUserOutputDto> {
        const user = User.create(data.first_name, data.last_name, data.email, data.cpf, data.password, data.confirm_password)
        const updateUser = await this.userGateway.update(id, user)
        return this.output(updateUser)
    }

    private output(user: User): updateUserOutputDto {
        return {
            message: "Usuário atualizado com sucesso.",
            user: user
        }
    }
}