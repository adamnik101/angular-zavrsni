export interface IApiResponse<T> {
    data: T;
    error: boolean;
    message: string;
    status_code: number; 
}
