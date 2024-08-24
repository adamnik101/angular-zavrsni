import { IPagedResponse } from "./i-paged-response";

export interface ITable<T> {
    data: IPagedResponse<T>;
    
}
