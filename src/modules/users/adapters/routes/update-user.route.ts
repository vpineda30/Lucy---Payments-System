import { Request, Response, Router } from "express";
import { UpdateUserController } from "../controllers/update-user.controller.js";

export const updateUserRoute = Router();
const controller = UpdateUserController.build();

updateUserRoute.put('/update-user/:id', async (request: Request<{ id: string }>, response: Response) => {
    return controller.handler(request, response);
})