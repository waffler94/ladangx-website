import React from 'react'

export default function AuthInput({ label, type, placeholder, inputName }) {
    return (
        <div className="">
            <label className="block  font-bold text-[#313F3A] mb-[8px]">{label}</label>
            <input
                type={type}
                name={inputName}
                className="block w-full px-[16px] py-[14.5px] border border-[#CFDDCF] rounded-[10px]  placeholder-[#CFDDCF] "
                placeholder={placeholder}
            />
        </div>
    )
}
