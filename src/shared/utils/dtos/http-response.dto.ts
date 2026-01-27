export interface IHttpResponse<T> {
    success: boolean
    status: number
    response?: T
}