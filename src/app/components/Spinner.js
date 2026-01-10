import React from "react";

export const Spinner = ({
  size = 16,
  color = "border-green-600"
}) => {
  return (
    <div
      className={`
        animate-spin
        rounded-full
        border-2
        border-t-transparent
        ${color}
      `}
      style={{
        width: size,
        height: size
      }}
    />
  );
};
