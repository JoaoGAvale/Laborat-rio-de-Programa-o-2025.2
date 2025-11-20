import React from "react";

export const Botao = ({
    onClick,
    disabled = false,
    text = "CONFIRMAR",
    type = "normal"
}) => {
    const className = {
        normal:`bg-green-400 px-5 border-2 border-green-600 rounded-full w-[200px] h-[50px] ${disabled ? "border-pink-500 text-pink-600 bg-white opacity-70" : " hover:bg-green-500 text-white"}`,
        cancel:`bg-white px-5 border-2 border-green-600 rounded-full w-[200px] h-[50px] text-green-600 ${disabled ? "opacity-70" : ""}`
    }

    return (
        <button 
            className={className[type] ?? ""}
            onClick={()=>{onClick()}}
            disabled={disabled}
        >
            {text}
        </button>
)
}