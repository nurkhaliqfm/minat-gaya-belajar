"use client";

import CircleProgress from "@/components/customs/circle-progress";
import Loading from "@/components/customs/loading";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

interface EventsHistoryProps {
  id?: number;
  ref_result?: {
    name?: string;
    keterangan?: string;
    rekomendasi?: string;
  };
}

export default function HasilEventPeminatan({
  params,
}: {
  params: { id_event: number };
}) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [eventsResult, setEventsResult] = useState<Array<EventsHistoryProps>>(
    []
  );

  const imageName = (name: string) => {
    const splitName = name.split(" - ");

    return "/img/" + splitName[0] + ".svg";
  };

  useEffect(() => {
    fetch("/api/event/result/" + params.id_event, { method: "GET" })
      .then((res) => res.json())
      .then((res) => {
        setEventsResult(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id_event]);

  return (
    <>
      <main className="flex h-full justify-center">
        <section className="w-full bg-white h-full rounded-2xl shadow-lg max-w-[1200px] p-4 md:p-10">
          {isLoading ? (
            <div className="flex justify-center items-center flex-col  h-full p-2">
              <div className=" p-6 rounded-lg flex flex-col gap-6 justify-center items-center">
                <HashLoader color="#4245D1" />
              </div>
            </div>
          ) : (
            <>
              <h3 className="text-2xl md:text-3xl font-semibold text-center my-2">
                Hasil Test Minat & Bakat
              </h3>
              <p className="text-center my-2 mb-4">
                Dari hasil test anda kami menemukan hasil berikut
              </p>
              <div
                className={cn(
                  "grid gap-4 grid-cols-1",
                  eventsResult.length == 2 && "md:grid-cols-2",
                  eventsResult.length >= 3 && "md:grid-cols-3"
                )}
              >
                {eventsResult.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        "shadow-md my-2 px-4 py-2 rounded-xl flex flex-col items-center hover:border-2 hover:border-primary"
                      )}
                    >
                      <div className="rounded-xl overflow-hidden mt-4">
                        <Image
                          src={imageName(item.ref_result?.name!)}
                          alt={item.ref_result?.name!}
                          width={120}
                          height={120}
                        />
                      </div>

                      <p className="my-2 font-bold">{item.ref_result?.name}</p>
                      <p className="my-2">
                        <span className="font-semibold italic">
                          Keterangan :{" "}
                        </span>{" "}
                        {item.ref_result?.keterangan}
                      </p>
                      <p className="my-2">
                        {" "}
                        <span className="font-semibold italic">
                          Rekomendasi :{" "}
                        </span>{" "}
                        {item.ref_result?.rekomendasi}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-center items-center my-2">
                <Button onClick={() => router.push("/")} variant="default">
                  Kemabli Ke Dashboard
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
