import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import { User } from "../entities/user.entity.js";
import { IUserGateway } from "../gateways/user.gateway.js";

type deleteUserInputDto = {
    id: string
}

type deleteUserOutputDto = any

export class DeleteUserUseCase implements UseCase<deleteUserInputDto, deleteUserOutputDto> {
    constructor(private readonly userGateway: IUserGateway) { }

    public static build(): DeleteUserUseCase {
        const repository = new PrismaMySqlUserRepository();
        return new DeleteUserUseCase(repository);
    }

    public async execute({ id }: deleteUserInputDto): Promise<any> {
        const user = await this.userGateway.delete(id)
        return this.output(user)
    }

    private output(user: User): deleteUserOutputDto {
        return {
            message: "Usuário deletado com sucesso.",
            user: user
        }
    }
}