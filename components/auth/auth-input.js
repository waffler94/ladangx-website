import React from 'react'

export default function AuthInput({ label, type, placeholder, inputName, error, required = false, initialValue, disabled = false }) {
    return (
        <div className="">
            <label className="block  font-semibold text-[#313F3A] mb-[8px]">{label}</label>
            <input
                type={type}
                required={required}
                defaultValue={initialValue || ""}
                disabled={disabled}
                name={inputName}
                className={`block w-full px-[16px] py-[14.5px] border disabled:bg-[#CFDDCF] border-[#CFDDCF] rounded-[10px] bg-white placeholder-[#CFDDCF] ${error ? 'border-red-500' : ''}`}
                placeholder={placeholder}
            />
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
