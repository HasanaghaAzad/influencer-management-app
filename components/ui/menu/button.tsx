import React from "react";

const MenuButton = ({children, className}: {children: React.ReactNode; className?: string}) => {
  return <button className={className || "bg-dark dark:bg-dark-2 border-dark dark:border-dark-2 border rounded-md inline-flex items-center justify-center py-3 px-7 text-center text-base font-medium text-white hover:bg-body-color hover:border-body-color disabled:bg-gray-3 disabled:border-gray-3 disabled:text-dark-5 "}>{children}</button>;
};

export default MenuButton;
