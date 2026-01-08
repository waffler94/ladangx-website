"use client";
import useSWR from "swr";
import { getBanners, getUser } from "@/lib/actions";

const fetcher = async () => {
    const result = await getUser();

    return result;
};

export function useGetUser() {
    const { data, error, isLoading, mutate } = useSWR(
        "user",
        fetcher
    );
    return {
        data: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}