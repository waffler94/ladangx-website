'use client'
import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { CalendarSearch, ChevronDownIcon } from 'lucide-react'
import { Calendar } from '../ui/calendar'

export default function DateInput({ label, placeholder, inputName }) {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState()
    return (
        <div className="relative">
            <label className="block  font-semibold text-[#313F3A] mb-[8px]">{label}</label>
            <input type="text" className="size-[1px] absolute bottom-0 left-1/2" required onChange={() => { }} name={inputName} value={date ? date.toLocaleDateString('en-GB') : ''} />
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        id="date"
                        className="w-full text-base !h-[48px] !px-[16px] justify-between font-normal"
                    >
                        {date ? date.toLocaleDateString('en-GB') : "Select date"}
                        <CalendarSearch />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                    <Calendar

                        mode="single"
                        selected={date}
                        captionLayout="dropdown"
                        disabled={(date) => date > new Date()}
                        onSelect={(date) => {
                            setDate(date)
                            setOpen(false)
                        }}
                    />
                </PopoverContent>
            </Popover>

        </div>
    )
}

