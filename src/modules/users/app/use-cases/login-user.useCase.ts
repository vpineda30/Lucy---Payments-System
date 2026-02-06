import { UseCase } from "../../../../shared/utils/dtos/useCase.dto.js";
import { PrismaMySqlUserRepository } from "../../infra/repositories/prisma-mysql-user.repository.js";
import { User } from "../entities/user.entity.js";
import { IUserGateway } from "../gateways/user.gateway.js";

type loginUserInputDto = {
  email: string;
  password: string;
};

type loginUserOutputDto = any;

export class LoginUserUseCase implements UseCase<loginUserInputDto, loginUserOutputDto> {
  constructor(private readonly loginGateway: IUserGateway) {}

  public static build(): LoginUserUseCase {
    const repository = new PrismaMySqlUserRepository();
    return new LoginUserUseCase(repository);
  }

  public async execute({ email, password }: loginUserInputDto): Promise<loginUserOutputDto> {
    const loginUser = await this.loginGateway.login(email, password);
    return this.output(loginUser);
  }

  private output(data: User): loginUserOutputDto {
    return {
      message: "Login com sucesso.",
      user: data,
    };
  }
}
