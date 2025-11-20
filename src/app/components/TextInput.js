'use client'
import React from "react"

export const TextInput= ({
    value,
    setValue,
    label = "",
    placeholder = "Digite",
    type = 'text',
    className = "",
    disabled = false,
})=>{
    return(
        <div className={`max-w-[720px] w-full text-black font-['PoppinsRegular'] ${className} ${disabled ? "opacity-70" : ""}`}>
            {label ? 
                <span className="text-[14px] text-left block ml-1">
                    {label}
                </span> 
            : 
                ""
            }
            <input
            type={type}
            placeholder={placeholder}
            value={value}
            className="w-full p-[11px] border-2 rounded-md border-gray-300 focus:border-gray-500 placeholder:text-gray-500"
            onChange={(e)=>setValue(e.target.value)}
            disabled={disabled}
            ></input>
        </div>
    )
}