import Image from "next/image";
import React from "react";

export default function Footer() {
  return (
    <div className="flex p-4 w-full justify-start items-center">
      <span className="mr-2 font-semibold">Powered By : </span>
      <Image src="/schuler.id_2.png" alt="codefm." width={80} height={80} />
    </div>
  );
}
