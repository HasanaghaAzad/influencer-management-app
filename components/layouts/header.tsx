"use client";
import { getCurrentUser } from "@/app/services/frontend/userService";
import { GetCurrentUser } from "@/app/types/users";
import MenuButton from "@/components/ui/menu/button";
import DropdownButton from "@/components/ui/menu/dropdownButton";
import Menu from "@/components/ui/menu/menu";
import MobileMenu from "@/components/ui/menu/mobileMenu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type currentUser = GetCurrentUser & {
  fullName: string;
};

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function Header() {
  const [currentUser, setCurrentUser] = useState<currentUser>();

  useEffect(() => {
    (async () => {
      const currentUser = await getCurrentUser();
      setCurrentUser({
        ...currentUser,
        fullName: currentUser.first_name + " " + currentUser.last_name,
      });
    })();
  }, []);

  const pathname = usePathname();
  const router = useRouter();
  const navigation = [
    { label: "Influencers List", href: "/", current: pathname === "/" },
    {
      label: "Create Influencer",
      href: "/create",
      current: pathname === "/create",
    },
  ];
  const handleLogout = async (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    await fetch("/api/logout");
    router.push("/login");
  };

  const userNavigation = [
    { label: "Sign out", href: "#", onClick: handleLogout },
  ];

  const activePageTitle = navigation.find((item) => item.current)?.label;
  return (
    <>
      <div className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="shrink-0 text-white font-bold rounded-md px-3 py-2 border-2 border-gray-300">
                Influencer Management App
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      aria-current={item.current ? "page" : undefined}
                      className={classNames(
                        item.current
                          ? "bg-gray-900 text-white"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                <Menu className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                    </MenuButton>
                  </div>
                  {currentUser && (
                    <DropdownButton
                      title={currentUser.fullName}
                      items={userNavigation}
                    />
                  )}
                </Menu>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <MobileMenu items={navigation} />
            </div>
          </div>
        </div>

        <div className="md:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
            {navigation.map((item) => (
              <a
                key={item.label}
                href={item.href}
                aria-current={item.current ? "page" : undefined}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white",
                  "block rounded-md px-3 py-2 text-base font-medium"
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            <div className="flex items-center px-5">
              <div className="ml-3">
                <div className="text-base/5 font-medium text-white">
                  {currentUser?.fullName}
                </div>
                <div className="text-sm font-medium text-gray-400">
                  {currentUser?.email}
                </div>
              </div>
            </div>
            <div className="mt-3 space-y-1 px-2">
              {userNavigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      <header>
        <div className="mx-auto max-w-7xl px-4 my-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight">
            {activePageTitle}
          </h1>
        </div>
      </header>
    </>
  );
}
