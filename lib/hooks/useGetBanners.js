"use client";
import useSWR from "swr";
import { getBanners } from "@/lib/actions";

const fetcher = async () => {
    const result = await getBanners();

    return result;
};

export function useGetBanners() {
    const { data, error, isLoading, mutate } = useSWR(
        "banners",
        fetcher
    );
    return {
        data: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}