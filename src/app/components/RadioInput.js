'use client'
import React from "react"

export const RadioInput = ({
    values,
    setSelectedValue,
    selectedValue,
    mainLabel = "",
    labels,
    className,
    disabled,
}) => {
    return(
    <div className={`max-w-[720px] w-full text-black font-['PoppinsRegular'] ${className} ${disabled ? "opacity-70" : ""}`}>
        {mainLabel ? 
            <span className="text-[14px] text-left block ml-1">
                {mainLabel}
            </span> 
        : 
            ""
        }
        <div className="flex flex-row gap-[25%]">
            {values.map((value, index)=>(
                <label
                    key={`${labels[index]}-${index}`}
                    className="flex items-center gap-2 cursor-pointer group pt-[13px] ml-2"
                >
                    <div className="relative flex items-center justify-center">
                        {/* RADIO */}
                        <input
                            type="radio"
                            value={value}
                            checked={value === selectedValue}
                            onChange={() => setSelectedValue(value)}
                            className="
                                h-6 w-6
                                appearance-none
                                rounded-full
                                border-2 border-green-600
                                cursor-pointer
                                transition-all duration-200
                                hover:border-green-700
                                group-hover:shadow-sm
                            "
                        />

                        {/* Bolinha interna animada */}
                        <span className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <span
                                className={`
                                    h-3 w-3 rounded-full bg-green-600
                                    ${value === selectedValue ? " scale-100 " : " scale-0 "}
                                    transition-transform duration-200
                                `}
                            ></span>
                        </span>
                    </div>

                    {/* Label do lado */}
                    <span className="select-none">
                        {labels[index]}
                    </span>
                </label>
            ))}
        </div>
    </div>
    )
}