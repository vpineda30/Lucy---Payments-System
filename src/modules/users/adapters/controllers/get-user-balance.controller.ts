import { Request, Response } from "express";
import { IHttpResponse } from "../../../../shared/utils/dtos/http-response.dto.js";
import { GetUserBalanceUseCase } from "../../app/use-cases/get-user-balance.useCase.js";

export class GetUserBalanceController {
    constructor(private readonly getUserBalanceUseCase: GetUserBalanceUseCase) {}

    public async handler(request: Request<{ id: string }>, response: Response) {
        try {
            const { id } = request.params
            const userBalance = await this.getUserBalanceUseCase.execute({ id })
            const httpResponse: IHttpResponse<{ balance: number }> = {
                success: false,
                status: 200,
                response: userBalance
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