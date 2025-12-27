'use client'
import { Eye, EyeClosed } from 'lucide-react';
import React from 'react'

export default function PasswordInput({ label, placeholder, inputName, error }) {
    const [isShowPassword, setIsShowPassword] = React.useState(false);
    return (
        <div className="relative">
            <label className="block  font-bold text-[#313F3A] mb-[8px]">{label}</label>
            <input
                type={isShowPassword ? "text" : "password"}
                name={inputName}
                className={`block w-full px-[16px] bg-white py-[14.5px] border ${error ? 'border-red-500' : 'border-[#CFDDCF]'} rounded-[10px]  placeholder-[#CFDDCF] `}
                placeholder={placeholder}
            />
            <button type="button" className="text-[24px] hover:scale-105 transition-all absolute top-[48px] right-4" onClick={() => setIsShowPassword(!isShowPassword)}>
                {
                    isShowPassword ? <EyeClosed /> : <Eye />
                }
            </button>
            {error && (
                <div className="text-red-500 mt-1 text-sm">
                    {Array.isArray(error) ? (
                        error.map((err, index) => <p key={index}>{err}</p>)
                    ) : (
                        <p>{error}</p>
                    )}
                </div>
            )}
        </div>
    )
}
