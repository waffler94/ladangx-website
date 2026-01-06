"use client";
import { getAutocompleteProject, getProjectDetails, getTicketList, searchProjects } from "@/lib/actions";
import useSWR from "swr";

// Create a wrapper function that calls your server action
const fetcher = async (params = {}) => {
    // Call the server action with provided params
    const result = await getTicketList(params);

    // Return in a format compatible with how you handle responses
    return result;
};

export function useGetTicketList(params = { nationality: string }) {
    // Use array key so SWR differentiates by params
    const key = ["ticket-list", params];

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