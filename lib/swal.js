"use client";
import { useTranslations } from "next-intl";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export const swal = withReactContent(Swal).mixin({
    customClass: {
        container: "!p-4 ",
        confirmButton:
            "!bg-[#FF7200] !border-[#FF7200] !w-full !rounded-[8px] hover:!bg-transparent !border !transition-all !duration-200",
        cancelButton:
            "!bg-transparent !w-full !rounded-[8px] !border-[1.6px] !border-[#FF7200] hover:!bg-[#FF7200] hover:!text-white transition-all duration-200 order-first ",
        popup: "bg-[#191919] text-white !p-0 !rounded-[8px]",
        title: "!text-[19px] !text-left font-bold !p-0",
        htmlContainer: "!text-[13px] !text-left !text-[#888C92] !p-0 !pb-0 !rounded-t-[8px] ",
        actions: "!flex !flex-row gap-x-[16px] !flex-nowrap !w-full !p-0 !m-0",
    },
});