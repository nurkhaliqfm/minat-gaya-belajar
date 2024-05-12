"use client";

import CircleProgress from "@/components/customs/circle-progress";
import Loading from "@/components/customs/loading";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface EventsProps {
  id?: number;
  name?: string;
  id_kode_soal?: number;
  ref_school?: {
    name?: string;
  };
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [events, setEvents] = useState<Array<EventsProps>>([]);

  const listAssets: any = {
    "Test Minat & Bakat": {
      img: "PEMINATAN.svg",
      slug: "peminatan",
    },
    "Test Gaya Belajar": {
      img: "GAYA-BELAJAR.svg",
      slug: "gaya-belajar",
    },
  };

  const handleOptionOnClick = (value: number) => {};

  useEffect(() => {
    setIsLoading(true);
    fetch("/api/event", { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setEvents(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <main className="flex h-full justify-center">
        <section className="w-full bg-white h-full rounded-2xl shadow-lg max-w-[1200px] p-4 md:p-10">
          <div className="flex flex-col md:flex-row gap-4">
            {events.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer shadow-md my-2 px-4 py-2 rounded-xl font-medium flex flex-col items-center hover:border-2 hover:border-primary"
                  )}
                  onClick={() => {
                    localStorage.removeItem(
                      `${listAssets[item.name!].slug}-${item.id}-status`
                    );
                    router.push(
                      "/" + listAssets[item.name!].slug + "/" + item.id
                    );
                  }}
                >
                  <div className="rounded-xl overflow-hidden mt-4">
                    <Image
                      src={"/img/" + listAssets[item.name!].img}
                      alt={item.name ?? ""}
                      width={120}
                      height={120}
                    />
                  </div>

                  <span className="my-2">{item.name}</span>
                </div>
              );
            })}
          </div>
          <div></div>
        </section>
      </main>
    </>
  );
}
