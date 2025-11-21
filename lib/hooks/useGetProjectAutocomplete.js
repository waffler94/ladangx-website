"use client";
import { getAutocompleteProject, getProjectDetails, searchProjects } from "@/lib/actions";
import useSWR from "swr";

// Create a wrapper function that calls your server action
const fetcher = async (params = {}) => {
    // Call the server action with provided params
    const result = await getAutocompleteProject(params);

    // Return in a format compatible with how you handle responses
    return result;
};

export function useGetProjectAutocomplete(params = { id: undefined }) {
    // Use array key so SWR differentiates by params
    const key = ["project-autocomplete", params];

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