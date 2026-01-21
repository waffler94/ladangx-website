"use client";
import useSWR from "swr";
import { getBanners, getVisits } from "@/lib/actions";

const fetcher = async () => {
    const result = await getVisits();

    return result;
};

export function useGetVisits() {
    const { data, error, isLoading, mutate } = useSWR(
        "visits",
        fetcher
    );
    return {
        data: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}