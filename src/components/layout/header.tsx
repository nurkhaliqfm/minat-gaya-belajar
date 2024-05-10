"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useCookies } from "next-client-cookies";

import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineChevronDown,
  HiOutlineUserCircle,
} from "react-icons/hi2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  const router = useRouter();
  const cookies = useCookies();
  const pathname = usePathname().replace("/", "") ?? "";
  const [navHover, setNavHover] = useState("");
  const [isHover, setIsHover] = useState(false);
  const handleHoverEnter = (e: any, state: boolean) => {
    setNavHover(e.id);
    setIsHover(state);
  };

  const handleLogout = async () => {
    await fetch("/api/signout/", {
      method: "DELETE",
    }).then((res) => {
      if (res.status === 200) {
        signOut();
        router.push("/api/auth/signin?callbackUrl=/");
      }
    });
  };

  const handleHoverLeave = () => {
    if (pathname !== "") {
      const splitPathname = pathname.split("/");
      setNavHover(splitPathname[0]);
      setIsHover(true);
    } else {
      setIsHover(false);
    }
  };

  useEffect(() => {
    if (pathname === "") {
      setIsHover(true);
      setNavHover("dashboard");
    } else {
      const splitPathname = pathname.split("/");
      setNavHover(splitPathname[0]);
      setIsHover(true);
    }
  }, [pathname]);

  return (
    <main className="flex justify-center ">
      <section className="flex flex-col gap-y-8 max-w-[1440px] p-4 pb-0 w-full items-center">
        <div className="flex flex-row justify-between w-full">
          <div className="flex gap-2 justify-center items-center">
            <Image
              src="/schuler.id_2.png"
              alt="schuler.id"
              width={120}
              height={120}
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex text-white justify-center items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="mx-2 hidden md:block text-black font-semibold">
                  {cookies.get("name")}
                </span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel className="md:hidden block">
                {cookies.get("name")}
              </DropdownMenuLabel>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={() => handleLogout()}
              >
                Keluar
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {/* <Button
            className="hover:bg-white border border-white w-10 h-10 md:w-fit md:h-fit"
            onClick={() => handleLogout()}
          >
            <span className="hidden md:inline">Sign Out</span>
            <span className="text-lg md:hidden">
              <HiOutlineArrowRightOnRectangle />
            </span>
          </Button> */}
        </div>
        {/* <div className="px-4 w-full">
          <ul className="flex flex-row text-white gap-5">
            <li className="flex flex-col justify-center items-center">
              <a
                id="dashboard"
                onMouseEnter={(e) => handleHoverEnter(e.target, true)}
                onMouseLeave={() => handleHoverLeave()}
                href="/dashboard"
                className={`${
                  isHover && navHover === "dashboard" ? "font-bold" : ""
                } hover:font-bold`}
              >
                Dashboard
              </a>
              <div
                className={`${
                  isHover && navHover === "dashboard" ? "w-1/2" : "w-0"
                } mt-2 transition-all duration-300 border-b-[3px] rounded-md`}
              ></div>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a
                id="bank-soal"
                onMouseEnter={(e) => handleHoverEnter(e.target, true)}
                onMouseLeave={() => handleHoverLeave()}
                href="/bank-soal"
                className={`${
                  isHover && navHover === "bank-soal" ? "font-bold" : ""
                } hover:font-bold`}
              >
                Bank Soal
              </a>
              <div
                className={`${
                  isHover && navHover === "bank-soal" ? "w-1/2" : "w-0"
                } mt-2 transition-all duration-300  border-b-[3px] rounded-md`}
              ></div>
            </li>
            <li className="flex flex-col justify-center items-center">
              <a
                id="paket-soal"
                onMouseEnter={(e) => handleHoverEnter(e.target, true)}
                onMouseLeave={() => handleHoverLeave()}
                href="/paket-soal"
                className={`${
                  isHover && navHover === "paket-soal" ? "font-bold" : ""
                } hover:font-bold`}
              >
                Paket Soal
              </a>
              <div
                className={`${
                  isHover && navHover === "paket-soal" ? "w-1/2" : "w-0"
                } mt-2 transition-all duration-300  border-b-[3px] rounded-md`}
              ></div>
            </li>
          </ul>
        </div> */}
      </section>
    </main>
  );
}
