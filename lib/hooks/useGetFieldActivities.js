"use client";
import useSWR from "swr";
import { getFieldActivities } from "@/lib/actions";

const fetcher = async ({ page, per_page }) => {
    const result = await getFieldActivities({ page, per_page });
    return result;
};

export function useGetFieldActivities({ page = 1, per_page = 20 } = {}) {
    const { data, error, isLoading, mutate } = useSWR(
        ["field-activities", page, per_page],
        () => fetcher({ page, per_page })
    );
    return {
        data: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}
