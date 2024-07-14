export interface IPagedResponse<T> {
    current_page: number;
    data: T;
    first_page_url: string | null;
    from: number | null;
    last_page: number;
    last_page_url: string | null;
    links: IPagedResponseLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number | null;
    total: number;
}

interface IPagedResponseLink {
    active: boolean;
    label: string;
    url: string | null;
}