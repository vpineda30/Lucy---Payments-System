import { User } from "../entities/user.entity.js";

export interface IUserGateway {
    getAll(): Promise<User[]>
    create(data: User): Promise<User>
    update(id: string, data: User): Promise<User>
    delete(id: string): Promise<User>
    login(email: string, password: string): Promise<User>
}