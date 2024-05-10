"use client";

import Header from "@/components/layout/header";
import Loading from "@/components/ui/loading";
import { useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Loading state={isLoading} />
      <Header />
      <main className="flex justify-center">
        <section className="w-full max-w-[1440px] p-4 flex-row justify-center"></section>
      </main>
    </>
  );
}
