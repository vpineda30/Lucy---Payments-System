import { Request, Response, Router } from "express";
import { LoginUserController } from "../controllers/login-user.controller.js";

export const loginUserRoute = Router();

loginUserRoute.post('/login', async (request: Request, response: Response) => {
    const controller = LoginUserController.build();
    return controller.handler(request, response)
});