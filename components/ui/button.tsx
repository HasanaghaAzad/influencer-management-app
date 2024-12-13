import React from "react";

const Button = ({
  text,
  onClick,
}: {
  text: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      className="bg-gray-800 w-full border-gray-800 border rounded-md inline-flex items-center justify-center py-[10px] px-7 text-center text-base font-medium text-white hover:bg-gray-700 hover:border-gray-700 disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 active:bg-gray-900 active:border-gray-900"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
