export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: string | number;
    total: number;
    from?: number | null;
    to?: number | null;
}