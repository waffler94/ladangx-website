'use server';
import { cache } from "react";
import axios from "./axios";
import { getCartResponse, getFieldActivitiesResponse, getTicketResponse, getUserResponse, loginResponse, ticketDateAvailabilityResponse, visitDetailsResponse, getVisitsResponse, getUserQuizStatusResponse, getQuizAnswerStatusResponse, getVouchersRawResponse, getNotificationsResponse } from "./declaration";

export const login = async ({
    phone_number, calling_code, password
}: {
    phone_number: string,
    calling_code: string,
    password: string
}) => {

    const response = await axios.post<loginResponse>('/users/login',
        {
            phone_number,
            calling_code,
            password
        });

    return { status: response.status, ...response.data };

};

export const checkPhoneNumber = async ({ phone_number, calling_code }: {
    phone_number: string,
    calling_code: string
}) => {
    const res = await axios.post('/users/check-phone', {
        phone_number,
        calling_code
    });

    return { status: res.status, ...res.data };
}

export const requestRegisterOtp = async ({ phone_number, email, calling_code, fullname, password, password_confirmation }: {
    phone_number: string,
    email: string,
    calling_code: string,
    fullname: string,
    password: string,
    password_confirmation: string
}) => {
    const res = await axios.post('/otp', {
        phone_number,
        calling_code,
        email,
        fullname,
        password,
        password_confirmation,
        request_type: 1
    });

    return { status: res.status, ...res.data };
}

export const resendRegisterOtp = async ({ identifier }: { identifier: string }) => {
    const res = await axios.post('/otp/resend', {
        identifier,
        request_type: 1
    });

    return { status: res.status, ...res.data };
}

export const register = async ({
    identifier, calling_code, phone_number, email, otp_code, password, password_confirmation, fullname, date_of_birth
}: {
    identifier: string,
    calling_code: string,
    phone_number: string,
    email?: string,
    otp_code: string,
    password: string,
    password_confirmation: string,
    fullname: string,
    date_of_birth?: string
}) => {

    const response = await axios.post('/users/register',
        {
            identifier,
            calling_code,
            phone_number,
            email,
            otp_code,
            password,
            password_confirmation,
            fullname,
            date_of_birth
        });

    return { status: response.status, ...response.data };

};

export const requestForgotPasswordOtp = async ({ phone_number, calling_code }: {
    phone_number: string,
    calling_code: string
}) => {
    const res = await axios.post('/otp', {
        phone_number,
        calling_code,
        request_type: 2
    });

    return { status: res.status, ...res.data };
}

export const resendForgotPasswordOtp = async ({ identifier }: { identifier: string }) => {
    const res = await axios.post('/otp/resend', {
        identifier,
        request_type: 2
    });

    return { status: res.status, ...res.data };
}

export const verifyForgotPasswordOtp = async ({
    identifier, otp_code
}: {
    identifier: string,

    otp_code: string
}) => {

    const res = await axios.post('/users/verify-otp', {
        identifier,
        otp_code,

    });

    return { status: res.status, ...res.data };
}

export const resetPassword = async ({
    identifier, phone_number, otp_code, password, password_confirmation
}: {
    identifier: string,
    phone_number: string,
    otp_code: string,
    password: string,
    password_confirmation: string
}) => {

    const response = await axios.post('/users/reset-password',
        {
            phone_number,
            identifier,
            otp_code,
            password,
            password_confirmation
        });

    return { status: response.status, ...response.data };

}

export const getTicketList = async ({ nationality }: { nationality: string }) => {
    const res = await axios.get<getTicketResponse>('/visits/ticket-types', {
        params: {
            nationality: nationality
        }
    })

    return { status: res.status, ...res.data };
}

export const addToCart = async ({ visit_date, details, voucher_code }: {
    visit_date: string,
    details: {
        ticket_type_id: string,
        quantity: number
    }[],
    voucher_code?: string
}) => {
    const res = await axios.post("/visits/cart/add", {
        visit_date, details, voucher_code
    })
    return { res_status: res.status, ...res.data };
}

export const getCart = async ({ visit_date }) => {
    const res = await axios.get<getCartResponse>("/visits/cart", {
        params: {
            visit_date
        }
    })
    return { res_status: res.status, ...res.data };
}

export const updateCart = async ({ cart_id, details }: {
    cart_id: string,
    details: {
        ticket_type_id: string,
        quantity: number
    }[]
}) => {
    const res = await axios.put("/visits/cart/update", {
        cart_id,
        details
    })
    return { res_status: res.status, ...res.data };

}

export const createVisit = async ({ cart_id }: { cart_id: string }) => {
    const res = await axios.post('/visits/', {
        cart_id,
    });

    return { res_status: res.status, ...res.data };
}

export const getTicketDateAvailability = async ({ target_date }: { target_date: string }) => {
    const res = await axios.get<ticketDateAvailabilityResponse>('/visits/check-availability', {
        params: {
            target_date
        }
    })

    return { status: res.status, ...res.data };
}

export const createUserVisit = async ({
    visit_date, details
}: {
    visit_date: string,
    details: {
        ticket_type_id: string,
        quantity: number
    }[]
}) => {

    const response = await axios.post('/visits',
        {
            visit_date,
            details
        });

    return { res_status: response.status, ...response.data };

}

export const getVisits = async ({ filter, page, per_page }: {
    filter?: "upcoming" | "past",
    page?: number,
    per_page?: number
}) => {
    const response = await axios.get<getVisitsResponse>('/visits', {
        params: {
            filter,
            page,
            per_page
        }
    });

    return { res_status: response.status, ...response.data };
}



export const getVisitDetails = async ({
    id
}: {
    id: number
}) => {
    const response = await axios.get<visitDetailsResponse>('/visits/' + id,
        {
            params: {
                include_qr: 1
            }
        }
    );

    return { res_status: response.status, ...response.data };
}

export const getUser = async () => {
    const res = await axios.get<getUserResponse>('/users');
    return { status: res.status, ...res.data };
}

export const updateUser = async (formData: FormData) => {
    const res = await axios.post('/users/update', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return { status: res.status, ...res.data };
}

export const updateUserPassword = async ({
    old_password,
    password,
    password_confirmation
}: { old_password: string; password: string; password_confirmation: string }) => {
    const res = await axios.post('/users/update-password', {
        old_password,
        password,
        password_confirmation
    });
    return { status: res.status, ...res.data };
}

export const deleteAccount = async ({ password }: { password: string }) => {
    const res = await axios.post('/users/delete-confirm', {
        password
    });
    return { status: res.status, ...res.data };
}

export const getUserQuizStatus = async (): Promise<getUserQuizStatusResponse> => {
    const res = await axios.get<getUserQuizStatusResponse>('/user-quizzes')
    return { status: res.status, ...res.data }
}

export const getQuizAnswerStatus = async ({ user_quiz_id }: { user_quiz_id: number }) => {
    const res = await axios.get<getQuizAnswerStatusResponse>('/user-quizzes/answers-by-type', {
        params: {
            user_quiz_id
        }
    })
    return { res_status: res.status, ...res.data }
}

export const getVouchersRaw = async ({ per_page, page, promo_code, user_voucher, voucher_type, discount_type, expired_only, used_only }: {
    per_page: number;
    page: number;
    promo_code?: string;
    user_voucher?: 1 | 2;
    voucher_type?: 1 | 2 | 3;
    discount_type?: 1 | 2 | 3;
    expired_only?: 1 | 2;
    used_only?: 1 | null;
}): Promise<{ res_status: number } & getVouchersRawResponse> => {
    const res = await axios.get<getVouchersRawResponse>("/vouchers", {
        params: { per_page, page, promo_code, user_voucher, voucher_type, discount_type, expired_only, used_only }
    })
    return { res_status: res.status, ...res.data }

}

export const getAllVouchers = async ({ per_page, page }) => {
    const res = await getVouchersRaw({
        per_page,
        page,
    })
    return res;
}

export const claimVoucher = async ({ voucher_id }: { voucher_id: number }) => {
    const res = await axios.post('/vouchers/claim-voucher', {
        voucher_id
    })
    return { res_status: res.status, ...res.data }
}

export const useVoucher = async ({ voucher_code }: { voucher_code: string }) => {
    const cartRes = await getCart({ visit_date: null })
    if (cartRes.res_status !== 200) {
        return { error_on: "cart_res", res_status: cartRes.res_status, ...cartRes }
    }
    console.log(cartRes);
    const res = await axios.put('/visits/cart/voucher', {
        cart_id: cartRes.data.cart_id,
        voucher_code
    })
    return { res_status: res.status, ...res.data }
}

export const validateVoucher = async ({ }) => { }

export const getNotifications = async ({ is_read, per_page, page }: {
    is_read?: 0 | 1;
    per_page?: number;
    page?: number;
}): Promise<{ status: number } & getNotificationsResponse> => {
    const res = await axios.get<getNotificationsResponse>('/users/notifications', {
        params: { is_read, per_page, page }
    });
    return { status: res.status, ...res.data };
};

export const markNotificationRead = async ({ notification }: { notification: number }) => {
    const res = await axios.post('/users/notification', { notification });
    return { status: res.status, ...res.data };
};

export const getFieldActivities = async ({ page, per_page }: {
    page?: number;
    per_page?: number;
}): Promise<{ status: number } & getFieldActivitiesResponse> => {
    const res = await axios.get<getFieldActivitiesResponse>('/field-activities', {
        params: { page, per_page }
    });
    return { status: res.status, ...res.data };
}

// export const getProjectDetails = async ({
//     id
// }: {
//     id: number
// }): Promise<ProjectDetailResponse> => {

//     const response = await axios.get<ProjectDetailResponse>('/projects/v2/' + id);

//     return response.data;

// };

