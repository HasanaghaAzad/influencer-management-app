import Link from "next/link";
import React, {useState} from "react";

export default function MobileMenu({items}: {items: {label: string; href: string; current: boolean}[]}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button onClick={() => setOpen(!open)} id="navbarToggler" className={` ${open && "navbarTogglerActive"} absolute right-4 top-1/2 block -translate-y-1/2 rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden`}>
        <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
        <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
        <span className="relative my-[6px] block h-[2px] w-[30px] bg-body-color dark:bg-white"></span>
      </button>
      <nav id="navbarCollapse" className={`absolute right-4 top-full w-full max-w-[250px] rounded-lg bg-white px-6 py-5 shadow dark:bg-dark-2 lg:static lg:block lg:w-full lg:max-w-full lg:bg-transparent lg:shadow-none lg:dark:bg-transparent ${!open && "hidden"} `}>
        <ul className="block lg:flex">
          {items.map((item, key) => (
            <ListItem NavLink={item.href} key={key} current={item.current}>
              {item.label}
            </ListItem>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const ListItem = ({children, NavLink, current = false}: {children: React.ReactNode; NavLink: string; current: boolean}) => {
  return (
    <>
      <li>
        <Link href={NavLink} className={"flex py-2 text-base font-medium text-dark hover:text-primary dark:text-white lg:ml-10 lg:inline-flex" + current ? " active" : ""}>
          {children}
        </Link>
      </li>
    </>
  );
};
