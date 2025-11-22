'use client'
import React from "react"

export const TextInput = ({
    value,
    setValue,
    label = "",
    placeholder = "Digite",
    type = "text",
    className = "",
    disabled = false,
    mask = null, // "cpf" | "cnpj" | null
}) => {

    const handleChange = (e) => {
        let v = e.target.value;

        // Remove tudo que não for número
        const numbersOnly = v.replace(/\D/g, "");

        // === MÁSCARA CPF ===
        if (mask === "cpf") {
            v = numbersOnly
                .slice(0, 11)
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d{2})$/, "$1-$2");
        }

        // === MÁSCARA CNPJ ===
        else if (mask === "cnpj") {
            v = numbersOnly
                .slice(0, 14)
                .replace(/(\d{2})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1.$2")
                .replace(/(\d{3})(\d)/, "$1/$2")
                .replace(/(\d{4})(\d{2})$/, "$1-$2");
        }

        setValue(v);
    };

    return (
        <div
            className={`
                max-w-[720px] w-full text-black font-['PoppinsRegular']
                ${className}
                ${disabled ? "opacity-70 bg-gray-100 text-gray-800" : ""}
            `}
        >
            {label && (
                <span className="text-[14px] text-left block pl-1 bg-white">
                    {label}
                </span>
            )}

            <input
                type={type}
                placeholder={placeholder}
                value={value}
                className="
                    w-full p-[11px] border-2 rounded-md border-gray-300
                    focus:border-gray-500 placeholder:text-gray-500
                "
                onChange={handleChange}
                disabled={disabled}
                maxLength={mask === "cnpj" ? 18 : mask === "cpf" ? 14 : undefined}
            />
        </div>
    );
};
