import React from "react";
import { Spinner } from "./Spinner";

export const PageLoading = ({
  text = "Carregando, aguarde..."
}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen font-['PoppinsRegular'] gap-4">
      <Spinner size={40} color="border-green-600" />
      <p className="text-green-500 text-lg">{text}</p>
    </div>
  );
};