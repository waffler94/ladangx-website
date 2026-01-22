"use client";
import useSWR from "swr";
import { getVisits } from "@/lib/actions";

// Create a wrapper function that calls your server action
const fetcher = async (params = {}) => {
    // Call the server action with provided params
    const result = await getVisits(params);

    // Return in a format compatible with how you handle responses
    return result;
};

export function useGetVisits(params = { filter: undefined, page: undefined, per_page: undefined }) {
    // Use array key so SWR differentiates by params
    const key = ["visits", params];

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