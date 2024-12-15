"use client";
import React, { useEffect, useRef, useState } from "react";

const useClickOutside = (handler: () => void) => {
  const domNode = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const outsideClickHandler = (event: MouseEvent) => {
      if (!domNode.current?.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", outsideClickHandler);

    return () => {
      document.removeEventListener("mousedown", outsideClickHandler);
    };
  });

  return domNode;
};
type DropdownButtonItem = {
  label: string;
  href: string;
  onClick?: (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => Promise<void>;
};

const DropdownButton = ({
  title,
  items,
}: {
  title: string;
  items: DropdownButtonItem[];
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const domNode = useClickOutside(() => {
    setDropdownOpen(false);
  });

  return (
    <div className="container  dark:bg-dark">
      <div className="py-8 text-center" ref={domNode}>
        <div className="relative inline-block   text-left">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center rounded-[5px] px-3 py-2 bg-dark dark:bg-dark-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700"
          >
            {title}
            <span className="pl-2">
              <i className="dropdown-arrow"></i>
            </span>
          </button>

          <div
            className={`shadow-1 dark:shadow-box-dark absolute right-0 mt-5 z-40 w-[175px] rounded-md bg-dark dark:bg-dark-2 py-[10px] transition-all bg-gray-800 text-white  ${
              dropdownOpen
                ? "top-full opacity-100 visible"
                : "top-[110%] invisible opacity-0"
            }`}
          >
            {items.map((item, index) => (
              <DropdownItem
                label={item.label}
                href={item.href}
                key={index}
                onClick={item.onClick}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropdownButton;

const DropdownItem = ({
  label,
  href,
  onClick,
}: {
  label: string;
  href: string;
  onClick?: DropdownButtonItem["onClick"];
}) => {
  return (
    <a
      href={href}
      className="block py-2 px-5 text-sm text-dark-5 hover:text-white hover:bg-gray-700"
      onClick={onClick}
    >
      {label}
    </a>
  );
};
