import { Request, Response, Router } from "express";
import { LoginUserController } from "../controllers/login-user.controller.js";

export const loginUserRoute = Router();
const controller = LoginUserController.build()

loginUserRoute.post('/login', async (request: Request, response: Response) => {
    return controller.handler(request, response)
})