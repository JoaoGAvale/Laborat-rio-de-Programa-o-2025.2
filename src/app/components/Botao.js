import React from "react";
import { Spinner } from "./Spinner";

export const Botao = ({
  onClick,
  disabled = false,
  loading = false,
  text = "CONFIRMAR",
  type = "normal"
}) => {
  const isDisabled = disabled || loading;

  const className = {
    normal: `
      bg-green-400 px-5 border-2 border-green-600 rounded-full
      w-[200px] h-[50px] flex items-center justify-center gap-2
      ${isDisabled
        ? "border-pink-500 text-pink-600 bg-white opacity-70 cursor-not-allowed"
        : "hover:bg-green-500 text-white cursor-pointer"}
    `,
    cancel: `
      bg-white px-5 border-2 border-green-600 rounded-full
      w-[200px] h-[50px] flex items-center justify-center gap-2
      text-green-600
      ${isDisabled ? "opacity-70 cursor-not-allowed" : "cursor-pointer"}
    `
  };

  return (
    <button
      className={className[type] ?? ""}
      onClick={onClick}
      disabled={isDisabled}
    >
      {loading && <Spinner size={16} color={type==="normal"&&isDisabled?"border-pink-500":"border-green-600"}/>}
      <span>{text}</span>
    </button>
  );
};
