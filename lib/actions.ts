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

export const requestRegisterOtp = async ({ phone_number, calling_code, fullname, password, password_confirmation }: {
    phone_number: string,
    calling_code: string,
    fullname: string,
    password: string,
    password_confirmation: string
}) => {
    const res = await axios.post('/otp', {
        phone_number,
        calling_code,
        fullname,
        password,
        password_confirmation,
        request_type: 1
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

