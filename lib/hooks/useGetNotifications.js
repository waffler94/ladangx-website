"use client";
import useSWR from "swr";
import { getNotifications } from "@/lib/actions";

const fetcher = async (params = {}) => {
    const result = await getNotifications(params);
    return result;
};

export function useGetNotifications(params = { is_read: undefined, per_page: 10, page: 1 }) {
    const key = ["notifications", params];

    const { data, error, isLoading, mutate } = useSWR(
        key,
        async () => fetcher(params)
    );

    return {
        data: data,
        isLoading,
        isError: error,
        refresh: () => mutate(),
    };
}
