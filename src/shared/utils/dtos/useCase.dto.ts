export interface UseCase<inputDto, outputDto> {
    execute(input?: inputDto): Promise<outputDto>
}