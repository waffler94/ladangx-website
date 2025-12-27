'use server';
import { cache } from "react";
import axios from "./axios";
import { loginResponse } from "./declaration";

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
    console.log({
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
// export const getProjectDetails = async ({
//     id
// }: {
//     id: number
// }): Promise<ProjectDetailResponse> => {

//     const response = await axios.get<ProjectDetailResponse>('/projects/v2/' + id);

//     return response.data;

// };

