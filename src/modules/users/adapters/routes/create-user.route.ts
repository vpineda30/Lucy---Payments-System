import { Request, Response, Router } from "express";
import { CreateUserController } from "../controllers/create-user.controller.js";

export const createUserRoute = Router();

createUserRoute.post('/create-user', async (request: Request, response: Response) => {
    const controller = CreateUserController.build();
    return controller.handler(request, response)
})