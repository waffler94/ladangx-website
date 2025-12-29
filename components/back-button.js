import { ChevronLeft } from 'lucide-react'
import React from 'react'

export default function BackButton() {
    return (
        <div className="rounded-full size-[40px] bg-[#245B00] hover:scale-110 transition-all  items-center justify-center flex border-white border-[3px] shadow-[0px_4px_0px_0px_rgba(57,83,39,1)] ">
            <ChevronLeft className="text-[24px] text-white bg-[#245B00] " />
        </div>
    )
}
