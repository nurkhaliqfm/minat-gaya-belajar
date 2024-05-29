"use client";

import { signOut } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { useCookies } from "next-client-cookies";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export default function Header() {
  const router = useRouter();
  const cookies = useCookies();

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

  return !cookies.get("name") ? (
    <></>
  ) : (
    <main className="flex justify-center ">
      <section className="flex flex-col gap-y-8 max-w-[1240px] p-4 pb-0 w-full items-center">
        <div className="flex flex-row justify-between w-full">
          <div className="flex gap-2 justify-center items-center">
            <Image
              src="/schuler.id_1.png"
              alt="schuler.id"
              width={120}
              height={120}
              onClick={() => router.push("/")}
              className="cursor-pointer"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <div className="flex text-white justify-center items-center">
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span className="mx-2 hidden md:block text-white font-semibold">
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
        </div>
      </section>
    </main>
  );
}
