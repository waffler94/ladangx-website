"use client";
import { getVouchersRaw } from "@/lib/actions";
import useSWR from "swr";

// Create a wrapper function that calls your server action
const fetcher = async (params = {}) => {
    // Call the server action with provided params
    const result = await getVouchersRaw(params);

    // Return in a format compatible with how you handle responses
    return result;
};

export function useGetVouchers(params = { per_page: 10, page: 1, promo_code: undefined, user_voucher: undefined, voucher_type: undefined, discount_type: undefined, expired_only: undefined, used_only: undefined }) {
    // Use array key so SWR differentiates by params
    const key = ["vouchers", params];

    const { data, error, isLoading, mutate } = useSWR(
        key,
        // SWR will pass the key as first arg; ignore it and forward params
        async () => fetcher(params)
    );

    return {
        data: data,
        isLoading,
        isError: error,
        refresh: () => mutate(),
    };
}