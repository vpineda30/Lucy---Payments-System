import { Request, Response, Router } from "express";
import { DeleteUserController } from "../controllers/delete-user.controller.js";

export const deleteUserRoute = Router();
const controller = DeleteUserController.build();

deleteUserRoute.delete('/delete-user/:id', async (request: Request<{ id: string }>, response: Response) => {
    return controller.handler(request, response)
})