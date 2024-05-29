"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <>
      <main className="flex h-full justify-center">
        <section className="w-full h-full flex justify-center items-center text-white max-w-[1200px] p-4 md:p-10">
          <div className="flex flex-col items-center gap-y-5">
            <div className="flex justify-center items-center">
              <span className="font-semibold text-2xl">401</span>
              <div className="w-[1px] h-12 bg-slate-100 opacity-30 mx-4"></div>
              <span className="text-sm">This page could not be found.</span>
            </div>
            <Button
              variant={"secondary"}
              className="w-fit"
              onClick={() => router.push("/")}
            >
              Back Home
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}
