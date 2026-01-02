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

export interface visitDetailsResponse {
    status: string;
    data: {
        visit: {
            id: string;
            reference: string;
            visit_date: string;
            user_email: string;
            user_name: string;
            status: number;
            status_text: string;
            total_amount: number;
            total_tickets: number;
            details: {
                ticket_type_id: number;
                ticket_type_name: string;
                ticket_type_price: number;
                quantity: number;
                total_price: number;
            }[];
        };
        qr_codes: {
            ticket_number: number;
            ticket_type_name: string;
            ticket_type_price: number;
            qr_string: string;
            order_id: string;
            guest_type: string;
            sequence: string;
            qr_image: string;
            qr_image_path: string;
        }[];
        total_tickets: number;
    };
}

export interface getUserResponse {
    status: number;
    message: string;
    message_key: string;
    data: {
        id: number;
        username: string;
        fullname: string;
        first_name: string | null;
        last_name: string | null;
        facebook_name: string | null;
        email: string;
        calling_code: string;
        phone_number: string;
        email_verified_at: string | null;
        last_login_at: string | null;
        last_login_ip: string | null;
        two_factor_secret: string | null;
        two_factor_recovery_codes: string | null;
        two_factor_confirmed_at: string | null;
        address_1: string | null;
        address_2: string | null;
        city: string | null;
        state: string | null;
        postcode: string | null;
        account_type: string | null;
        date_of_birth: string | null;
        is_social_account: number;
        platform: number;
        profile_picture: string;
        remember_token: string | null;
        created_at: string;
        referral_id: number;
        invitation_code: string;
        referral_structure: string;
        nationality: string | null;
        profile_picture_path: string;
        iso_code: string;
        nationality_info: any;
    };
}