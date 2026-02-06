import { Request, Response, Router } from "express";
import { CreateUserController } from "../controllers/create-user.controller.js";

export const createUserRoute = Router();
const controller = CreateUserController.build();

createUserRoute.post('/create-user', async (request: Request, response: Response) => {
    return controller.handler(request, response)
})