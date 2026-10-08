"use client";

import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { navigation } from "@/constants";
import { cn } from "@/utils/cn";
import Button from "./Button";
import { BiSolidLeaf } from "react-icons/bi";

export default function Nav() {
  const user = useUser();
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = user
    ? [...navigation, { name: "Dashboard", href: "/dashboard" }]
    : navigation;

  return (
    <header
      className={cn(
        "bg-dark-green relative isolate z-10 transition-all duration-300 ease-out",
        isHome ? "shadow-none" : "shadow-lg"
      )}
    >
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2.5 lg:px-8"
      >
        <NavLogo />
        <DesktopNav links={links} pathname={pathname} />
        <SidebarOpen onOpen={() => setMobileMenuOpen(true)} />
      </nav>

      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="bg-dark-green sm:ring-light-green px-5.5 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto py-2 sm:max-w-sm sm:ring-2">
          <div className="flex items-center justify-between">
            <NavLogo />
            <SidebarClose onClose={() => setMobileMenuOpen(false)} />
          </div>
          <MobileNav
            links={links}
            pathname={pathname}
            onNavigate={() => setMobileMenuOpen(false)}
          />
        </DialogPanel>
      </Dialog>
    </header>
  );
}

export function NavLogo() {
  return (
    <div className="flex lg:flex-1">
      <Link
        href="/"
        className="-m-1.5 p-1.5"
        aria-label="Green Campus Initiative"
      >
        <span className="sr-only">Green Campus Initiative</span>
        <img
          alt="Green Campus Initiative"
          src="/gci-transparent.webp"
          className="h-14 w-auto"
        />
      </Link>
    </div>
  );
}

export function SidebarOpen({ onOpen }) {
  return (
    <div className="flex lg:hidden">
      <button
        type="button"
        onClick={onOpen}
        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700 dark:text-gray-400"
        aria-label="Open main menu"
      >
        <Bars3Icon aria-hidden="true" className="size-6" />
      </button>
    </div>
  );
}

export function SidebarClose({ onClose }) {
  return (
    <button
      type="button"
      onClick={onClose}
      className="-m-2.5 rounded-md p-2.5 text-gray-700 dark:text-gray-400"
      aria-label="Close menu"
    >
      <XMarkIcon aria-hidden="true" className="size-6" />
    </button>
  );
}

export function DesktopNav({ links, pathname }) {
  return (
    <div className="hidden items-center lg:flex lg:gap-x-12">
      {links.map((item) => {
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.name}
            href={item.href}
            aria-label={item.name}
            className={cn(
              "font-staatliches text-2xl/6 font-normal text-white hover:font-semibold",
              isActive && "underline"
            )}
          >
            {item.name}
          </Link>
        );
      })}
      <Button
        variant="primary"
        icon={BiSolidLeaf}
        label="Join"
        iconPosition="end"
        iconClassName="size-6 text-white ml-1"
      />
    </div>
  );
}

export function MobileNav({ links, pathname, onNavigate }) {
  return (
    <div className="mt-6 flow-root">
      <div className="-my-6 divide-y divide-gray-500/10 dark:divide-white/10">
        <div className="font-staatliches space-y-2 px-3.5 py-6">
          {links.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                aria-label={item.name}
                onClick={onNavigate}
                className={cn(
                  "-mx-3 block rounded-lg px-3 py-2 text-2xl/6 font-normal text-white hover:font-semibold",
                  isActive && "underline"
                )}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="py-6">
          <Button
            variant="primary"
            icon={BiSolidLeaf}
            iconClassName="size-5 text-white mr-0.5"
            label="Join"
          />
        </div>
      </div>
    </div>
  );
}
