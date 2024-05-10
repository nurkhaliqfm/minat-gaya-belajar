"use client";

import { useCookies } from "next-client-cookies";
import Image from "next/image";
import React from "react";

export default function Footer() {
  const cookies = useCookies();

  return !cookies.get("name") ? (
    <></>
  ) : (
    <div className="flex p-4 w-full justify-start items-center">
      <span className="mr-2 text-white text-sm font-semibold">
        Powered By :{" "}
      </span>
      <Image src="/Codefm.png" alt="codefm." width={60} height={60} />
    </div>
  );
}
