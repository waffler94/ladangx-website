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
        [categoryName: string]: TicketItem[],
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
        id: string;
        reference: string;
        visit_date: string;
        user_email: string;
        user_name: string | null;
        status: number;
        status_text: string;
        total_amount: number;
        total_tickets: number;
        details: {
            ticket_type_id: string;
            ticket_type_name: string;
            ticket_type_price: number;
            unit_price_paid: number;
            quantity: number;
            total_price: number;
        }[];
        subtotal: number;
        discount_amount: number;
        amount_after_discount: number;
        tax_amount: number;
        tax_breakdown: {
            name: string;
            rate: number;
            amount: number;
        }[];
        grand_total: number;
        pdf_url: string;
        pdf_path: string;
        created_at: string;
        qr_codes?: {
            ticket_number: number;
            ticket_type_name: string;
            ticket_type_price: number;
            qr_string: string;
            order_id: string;
            guest_type: string;
            sequence: string;
            qr_image_base64: string;
            entry_date: string;
        }[];
    };
}

export interface getCartResponse {
    status: string;
    message: string;
    data: {
        cart_id: string;
        cart: {
            id: string;
            visit_date: string;
            visit_day: string;
            voucher_code: string | null;
            items: {
                cart_item_id: string;
                ticket_type_id: string;
                ticket_type_name: string;
                ticket_type_nationality: string;
                price: string;
                quantity: number;
                total_price: string;
            }[];
            subtotal: string;
            discount_amount: string;
            amount_after_discount: string;
            tax_amount: string;
            tax_breakdown: {
                name: string;
                rate: number;
                amount: string;
            }[];
            grand_total: string;
            total_tickets: string;
            timer: {
                total_seconds: number;
                elapsed_seconds: number;
                time_left_seconds: number;
                time_left_minutes: number;
                is_expired: boolean;
                updated_at: string;
            };
        };
    };
}

export interface getVisitsResponse {
    status: string;
    data: {
        id: string;
        visit_date: string;
        reference: string;
        status: number;
        status_text: string;
        total_amount: number;
        created_at: string;
        details: {
            ticket_type_id: string;
            ticket_type_name: string;
            ticket_type_price: number;
            unit_price_paid: number;
            quantity: number;
            total_price: number;
        }[];
    }[];
    pagination: Pagination;
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