import { randomUUID } from "node:crypto"

export interface IUserProps {
    id: string
    first_name: string
    last_name: string
    email: string
    cpf: string
    password: string
}

export class User {
    constructor(private readonly props: IUserProps) { }

    public static validation(first_name: string, last_name: string, email: string, cpf: string, password: string, confirm_password: string) {
        if (!first_name || !last_name || !email || !cpf || !password || !confirm_password) {
            throw new Error("Campos obrigatórios em falta.")
        }

        if (password.length < 8) {
            throw new Error("Senha Fraca. Tente uma senha mais segura.")
        }

        if (confirm_password !== password) {
            throw new Error("As senhas devem ser iguais. Tente novamente.")
        }
    }

    public static create(first_name: string, last_name: string, email: string, cpf: string, password: string, confirm_password: string) {
        User.validation(first_name, last_name, email, cpf, password, confirm_password);
        return new User({
            id: randomUUID(),
            first_name: first_name,
            last_name: last_name,
            email: email,
            cpf: cpf,
            password: password
        })
    }

    public get id() {
        return this.props.id
    }

    public get first_name() {
        return this.props.first_name
    }

    public get last_name() {
        return this.props.last_name
    }

    public get email() {
        return this.props.email
    }

    public get cpf() {
        return this.props.cpf
    }

    public get password() {
        return this.props.password
    }
}