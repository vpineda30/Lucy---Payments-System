import { prisma } from "../../../../shared/database/prisma/prisma.js";
import { User } from "../../app/entities/user.entity.js";
import { IUserGateway } from "../../app/gateways/user.gateway.js";
import bcrypt from 'bcrypt'

export class PrismaMySqlUserRepository implements IUserGateway  {
    public async getAll(): Promise<User[]> {
        const users = await prisma.user.findMany()
        return users.map((u) => {
            return new User({
                id: u.id,
                first_name: u.first_name,
                last_name: u.last_name,
                email: u.email,
                cpf: u.cpf,
                password: u.password,
                balance: u.balance.toNumber()
            })
        })
    }

    public async create(data: User): Promise<User> {
        const passwordHash = await bcrypt.hash(data.password, 12)
        const user = await prisma.user.create({
            data: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                cpf: data.cpf,
                password: passwordHash,
                balance: data.balance
            }
        })

        return new User({
            id: user.id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            cpf: user.cpf,
            password: user.password,
            balance: user.balance.toNumber()
        })
    }

    public async update(id: string, data: User): Promise<User> {
        const verifyId = await prisma.user.findUnique({ where: { id: id } })

        if (!verifyId) {
            throw new Error("Usuário não encontrado.")
        }

        const updateUser = await prisma.user.update({
            where: { id: id },
            data: {
                id: data.id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
                password: data.password,
            }
        })

        return new User({
            id: updateUser.id,
            first_name: updateUser.first_name,
            last_name: updateUser.last_name,
            email: updateUser.email,
            cpf: updateUser.cpf,
            password: updateUser.password,
            balance: updateUser.balance.toNumber()
        })
    }

    public async delete(id: string): Promise<User> {
        const verifyId = await prisma.user.findUnique({ where: { id: id } })

        if (!verifyId) {
            throw new Error("Usuário não encontrado.")
        }

        const deleteUser = await prisma.user.delete({
            where: { id: id }
        })

        return new User({
            id: deleteUser.id,
            first_name: deleteUser.first_name,
            last_name: deleteUser.last_name,
            email: deleteUser.email,
            cpf: deleteUser.cpf,
            password: deleteUser.password,
            balance: deleteUser.balance.toNumber()
        })
    }

    public async login(email: string, password: string): Promise<User> {
        const userLogin = await prisma.user.findUnique({
            where: { email: email }
        })
        
        if (!userLogin) {
            throw new Error("Usuário não encontrado.")
        }
        
        const comparePassword = await bcrypt.compare(password, userLogin.password)

        if (!comparePassword) throw new Error("Senha incorreta. Tenta novamente")

        return new User({
            id: userLogin.id,
            first_name: userLogin.first_name,
            last_name: userLogin.last_name,
            email: userLogin.email,
            cpf: userLogin.cpf,
            password: userLogin.password,
            balance: userLogin.balance.toNumber()
        })
    }
}