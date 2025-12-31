export interface Pagination {
    current_page: number;
    last_page: number;
    per_page: string | number;
    total: number;
    from?: number | null;
    to?: number | null;
}

export interface loginResponse {
    message: string;
    message_key: string;
    data: {
        token: string;
    }
    token: string;
}

export interface getTicketResponse {
    status: string;
    data: {
        malaysia: TicketItem[]
        international: TicketItem[]
    }

}

export interface TicketItem {
    id: string,
    name: string,
    nationality: "malaysia" | "international",
    price: number
    active: boolean
}

export interface ticketDateAvailabilityResponse {
    data: {
        closure_reason: string,
        date: string,
        is_available: boolean
        is_closed: boolean
        ticket_types: {
            malaysia: ticketInfoItem[]
            international: ticketInfoItem[]
        }
    }
}

export interface ticketInfoItem {
    ticket_type_id: string,
    ticket_type_name: string,
    price: number,
    available: number,
    booked: number,
    capacity: number,
}