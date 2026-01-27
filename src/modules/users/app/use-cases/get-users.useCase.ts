import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { User } from "../entities/user.entity.js";
import { IUserGateway } from "../gateways/user.gateway.js";

type getUsersInputDto = void;

type getUsersOutputDto = {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  cpf: string
  password: string
}[];

export class GetUsersUseCase implements UseCase<getUsersInputDto, getUsersOutputDto> {
  constructor(private readonly userGateway: IUserGateway) { }

  public async execute(): Promise<getUsersOutputDto> {
    const users = await this.userGateway.getAll();
    return this.output(users);
  }

  private output(users: User[]): getUsersOutputDto {
    const allUsers = users.map((u) => {
      return new User({
        id: u.id,
        first_name: u.first_name,
        last_name: u.last_name,
        email: u.email,
        cpf: u.cpf,
        password: u.password,
      });
    });

    return allUsers;
  }
}
