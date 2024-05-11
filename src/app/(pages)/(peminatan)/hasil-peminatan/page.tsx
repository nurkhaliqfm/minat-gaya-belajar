"use client";

import CircleProgress from "@/components/customs/circle-progress";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import useQueryParams from "@/hooks/useQueryParams";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { HashLoader } from "react-spinners";

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
  const { toast } = useToast();
  const kodeEvent = params.kode;
  const { queryParams, setQueryParams } = useQueryParams<{
    quest_number?: string;
  }>();

  const currentSoal = parseInt(queryParams?.get("quest_number") || "1");

  const [isLoading, setIsLoading] = useState(true);
  const [bundelSoal, setBundelSoal] = useState<BundleSoalProps>();
  const [totalSoals, setTotalSoals] = useState<number>(currentSoal);
  const [selectedOption, setSelectedOption] = useState<
    Array<ItemOptionsBundle>
  >([]);

  const handleOptionOnClick = (option: number, soal: number) => {
    if (bundelSoal?.bank_soal?.bundle_option) {
      const getOptionData = bundelSoal?.bank_soal?.bundle_option.find(
        (item) => item.id === option && item.id_soal === soal
      );

      const cekOptionSelectedIndex = selectedOption.findIndex(
        (item) => item.id === option && item.id_soal === soal
      );

      const currentOptionSelected = selectedOption.filter(
        (item) => item.id_soal === soal
      );

      if (cekOptionSelectedIndex >= 0) {
        let newSelectedOption = [...selectedOption];
        newSelectedOption.splice(cekOptionSelectedIndex, 1);

        setSelectedOption(newSelectedOption);
      } else {
        if (currentOptionSelected.length <= 2 && getOptionData) {
          setSelectedOption((prevState) => [...prevState, getOptionData]);
        } else {
          toast({
            variant: "destructive",
            title: "Gagal Memilih",
            description: "Anda hanya dapat memilih maksimal 3",
          });
        }
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
    const k1 = selectedOption.filter((item) => item.id_kode_option === 1);
    const k2 = selectedOption.filter((item) => item.id_kode_option === 2);
    const k3 = selectedOption.filter((item) => item.id_kode_option === 3);
    const k4 = selectedOption.filter((item) => item.id_kode_option === 4);
    const k5 = selectedOption.filter((item) => item.id_kode_option === 5);
    const k6 = selectedOption.filter((item) => item.id_kode_option === 6);
    const k7 = selectedOption.filter((item) => item.id_kode_option === 7);
    const k8 = selectedOption.filter((item) => item.id_kode_option === 8);

    console.log("K1:", k1.length);
    console.log("K2:", k2.length);
    console.log("K3:", k3.length);
    console.log("K4:", k4.length);
    console.log("K5:", k5.length);
    console.log("K6:", k6.length);
    console.log("K7:", k7.length);
    console.log("K8:", k8.length);
  };

  useEffect(() => {
    if (currentSoal) {
      fetch("/api/peminatan/bundel-soal/" + kodeEvent, { method: "GET" })
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
      <main className="flex h-full justify-center">
        <section className="w-full bg-white h-full rounded-2xl shadow-lg max-w-[1200px] p-4 md:p-16 flex flex-col justify-center">
          {isLoading ? (
            <div className="flex justify-center items-center flex-col  h-full p-2">
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
                            "cursor-pointer col-span-2 border-2 border-slate-300 my-2 px-4 py-2 rounded-lg font-medium hover:font-semibold hover:border-primary hover:text-primary transition-all",
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
              <div className="flex justify-center gap-x-4 my-4">
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