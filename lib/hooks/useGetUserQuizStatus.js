"use client";
import useSWR from "swr";
import { getBanners, getUserQuizStatus } from "@/lib/actions";

const fetcher = async () => {
    const result = await getUserQuizStatus();

    return result;
};

export function useGetUserQuizStatus() {
    const { data, error, isLoading, mutate } = useSWR(
        "quiz-status",
        fetcher
    );
    return {
        data: data,
        isLoading,
        isError: error,
        refresh: mutate,
    };
}