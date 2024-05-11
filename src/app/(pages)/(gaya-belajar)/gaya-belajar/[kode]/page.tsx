"use client";

import CircleProgress from "@/components/customs/circle-progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";
import AlertDialog from "./alert-dialog";
import { useRouter } from "next/navigation";

interface ItemOptionsBundle {
  id?: number;
  id_soal?: number;
  name?: string;
  id_kode_option?: number;
}

interface BundleSoalProps {
  id?: number;
  id_event?: number;
  bank_soal?: {
    id?: number;
    soal?: string;
    id_kode_soal?: number;
    bundle_option?: Array<ItemOptionsBundle>;
  };
}

export default function TestPage({ params }: { params: { kode: string } }) {
  const router = useRouter();
  const kodeEvent = params.kode;
  const { queryParams, setQueryParams } = useQueryParams<{
    quest_number?: string;
  }>();

  const currentSoal = parseInt(queryParams?.get("quest_number") || "1");

  const [isLoading, setIsLoading] = useState(true);
  const [historyTestAlert, setHistoryTestAlert] = useState(false);
  const [bundelSoal, setBundelSoal] = useState<BundleSoalProps>();
  const [totalSoals, setTotalSoals] = useState<number>(currentSoal);
  const [selectedOption, setSelectedOption] = useState<
    Array<ItemOptionsBundle>
  >([]);

  const handleHistoryTestAlert = (state: boolean) => {
    if (state) {
      const latestHistoryOption: any = localStorage.getItem(
        `gaya-belajar-history-${kodeEvent}`
      );
      localStorage.setItem(`gaya-belajar-${kodeEvent}-status`, "start");
      setSelectedOption(JSON.parse(latestHistoryOption) ?? []);
    } else {
      localStorage.removeItem(`gaya-belajar-history-${kodeEvent}`);
      localStorage.setItem(`gaya-belajar-${kodeEvent}-status`, "start");
    }
    setHistoryTestAlert(false);
  };

  const handleOptionOnClick = (option: number, soal: number) => {
    if (bundelSoal?.bank_soal?.bundle_option) {
      const getOptionData = bundelSoal?.bank_soal?.bundle_option.find(
        (item) => item.id === option && item.id_soal === soal
      );

      const cekOptionSelectedIndex = selectedOption.findIndex(
        (item) => item.id_soal === soal
      );

      if (cekOptionSelectedIndex >= 0 && getOptionData) {
        let newSelectedOption = [...selectedOption];
        newSelectedOption.splice(cekOptionSelectedIndex, 1);
        newSelectedOption.push(getOptionData);
        setSelectedOption(newSelectedOption);
        const optionsHistory = JSON.stringify(newSelectedOption);
        localStorage.setItem(
          `gaya-belajar-history-${kodeEvent}`,
          optionsHistory
        );
        localStorage.setItem(`gaya-belajar-${kodeEvent}-status`, "start");
      } else if (getOptionData) {
        setSelectedOption((prevState) => [...prevState, getOptionData]);
        let newSelectedOption = [...selectedOption, getOptionData];
        const optionsHistory = JSON.stringify(newSelectedOption);
        localStorage.setItem(
          `gaya-belajar-history-${kodeEvent}`,
          optionsHistory
        );
        localStorage.setItem(`gaya-belajar-${kodeEvent}-status`, "start");
      }
    }
  };

  const checkSelectedOption = (option: number, soal: number) => {
    const getOptionData = selectedOption.find(
      (item) => item.id === option && item.id_soal === soal
    );
    return getOptionData ? true : false;
  };

  const handleChangeQuestion = (currentQuest: number) => {
    setIsLoading(true);
    setQueryParams({ quest_number: `${currentQuest}` });
  };

  const handleSubmitResult = () => {
    setIsLoading(true);
    const reqBody = {
      id_event: bundelSoal?.id_event,
      selected_option: selectedOption,
    };

    fetch("/api/event", {
      method: "POST",
      body: JSON.stringify(reqBody),
    }).then(async (res) => {
      if (res.status) {
        const responseData = await res.json();
        localStorage.removeItem(`gaya-belajar-history-${kodeEvent}`);
        localStorage.removeItem(`gaya-belajar-${kodeEvent}-status`);
        router.push("/hasil-gaya-belajar/" + responseData.data.event_id);
      }
    });
  };

  useEffect(() => {
    if (currentSoal) {
      const latestHistoryStatus: any = localStorage.getItem(
        `gaya-belajar-${kodeEvent}-status`
      );

      const latestHistoryOption: any = localStorage.getItem(
        `gaya-belajar-history-${kodeEvent}`
      );

      if (!latestHistoryStatus && latestHistoryOption) {
        setHistoryTestAlert(true);
      } else if (latestHistoryOption) {
        setHistoryTestAlert(false);
        setSelectedOption(JSON.parse(latestHistoryOption) ?? []);
      }

      fetch("/api/gaya-belajar/bundel-soal/" + kodeEvent, { method: "GET" })
        .then((res) => res.json())
        .then((res) => {
          setBundelSoal(res.data.bundle_soal[currentSoal - 1]);
          setTotalSoals(res.data.bundle_soal.length);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [kodeEvent, currentSoal]);

  return (
    <>
      <AlertDialog
        state={historyTestAlert}
        handleAlert={handleHistoryTestAlert}
      />
      <main className="flex h-full justify-center">
        <section className="w-full bg-white h-full rounded-2xl shadow-lg max-w-[1200px] p-4 md:p-16 flex flex-col justify-center">
          {isLoading ? (
            <div className="flex justify-center items-center flex-col h-full p-2">
              <div className=" p-6 rounded-lg flex flex-col gap-6 justify-center items-center">
                <HashLoader color="#4245D1" />
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2">
                <div className="col-start-1 col-span-2 md:col-start-2 md:col-span-1 flex items-center justify-center m-4">
                  <CircleProgress current={currentSoal} end={totalSoals} />
                </div>
                <div className="col-start-1 col-span-2 md:row-start-1 md:col-span-1">
                  <h5 className="text-sm">
                    Pertanyaan {currentSoal} dari {totalSoals}
                  </h5>
                  <h3 className="text-lg font-semibold my-2 leading-5">
                    {bundelSoal?.bank_soal?.soal}
                  </h3>
                  {bundelSoal?.bank_soal?.bundle_option &&
                    bundelSoal?.bank_soal?.bundle_option.map((item, index) => {
                      return (
                        <div
                          key={index}
                          className={cn(
                            "cursor-pointer col-span-2 border-2 border-slate-100 my-2 px-4 py-2 rounded-lg font-medium hover:font-semibold hover:border-primary hover:text-primary transition-all",
                            checkSelectedOption(item.id!, item.id_soal!)
                              ? "bg-blue-800 text-white hover:text-white"
                              : ""
                          )}
                          onClick={() =>
                            handleOptionOnClick(item.id!, item.id_soal!)
                          }
                        >
                          {item.name}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="flex justify-center gap-x-4 my-4 md:my-10">
                <Button
                  onClick={() => handleChangeQuestion(currentSoal - 1)}
                  disabled={currentSoal == 1 ? true : false}
                  variant="outline"
                >
                  Sebelumnya
                </Button>

                {currentSoal === totalSoals ? (
                  <Button
                    onClick={() => handleSubmitResult()}
                    variant="default"
                  >
                    Simpan
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleChangeQuestion(currentSoal + 1)}
                    variant="default"
                  >
                    Selanjutnya
                  </Button>
                )}
              </div>
            </>
          )}
        </section>
      </main>
    </>
  );
}
