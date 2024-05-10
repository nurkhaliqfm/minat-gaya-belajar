"use client";

import CircleProgress from "@/components/customs/circle-progress";
import Loading from "@/components/customs/loading";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { useState } from "react";

interface SelectedOption {
  id?: number;
  name?: string;
}

export default function Home() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Array<SelectedOption>>(
    []
  );

  const currentSoal = 1;
  const totalSoal = 10;

  const dataSoal = {
    question:
      "Pilihlah maksimal 3 diantara 8 yang paling mencerminkan diri kamu ?",
    bundle_options: [
      { id: 1, name: "Suka Bercerita" },
      { id: 2, name: "Sangat menyukai matematika" },
      {
        id: 3,
        name: "Suka melihat peta dari pada petunjuk tertulis mengenai letak suatu tempat",
      },
      { id: 4, name: "Menyukai olah raga senam" },
      { id: 5, name: "Memiliki minat yang besar dalam dunia musik" },
      { id: 6, name: "Bergaul dengan baik" },
      { id: 7, name: "Lebih memilih bekerja sendiri" },
      { id: 8, name: "Memperhatikan orang-orang sekitar" },
    ],
  };

  const handleOptionOnClick = (value: number) => {
    const getOptionData = dataSoal.bundle_options.find(
      (option) => option.id === value
    );

    const cekOptionSelectedIndex = selectedOption.findIndex(
      (option) => option.id === value
    );

    if (cekOptionSelectedIndex >= 0) {
      let newSelectedOption = [...selectedOption];
      newSelectedOption.splice(cekOptionSelectedIndex, 1);

      setSelectedOption(newSelectedOption);
    } else {
      if (selectedOption.length <= 2 && getOptionData) {
        setSelectedOption((prevState) => [...prevState, getOptionData]);
      } else {
        toast({
          variant: "destructive",
          title: "Gagal Memilih",
          description: "Anda hanya dapat memilih maksimal 3",
        });
      }
    }
  };

  const checkSelectedOption = (value: number) => {
    const getOptionData = selectedOption.find((option) => option.id === value);

    return getOptionData ? true : false;
  };

  return (
    <>
      <Loading state={isLoading} />
      <main className="flex h-full justify-center">
        <section className="w-full bg-white h-full rounded-2xl shadow-lg max-w-[1440px] p-4 ">
          <div className="grid grid-cols-2">
            <div className="col-start-1 col-span-2 flex justify-center m-4">
              <CircleProgress current={currentSoal} end={totalSoal} />
            </div>
            <div className="col-start-1 col-span-2 ">
              <h5 className="text-sm">
                Pertanyaan {currentSoal} dari {totalSoal}
              </h5>
              <h3 className="text-lg font-semibold my-2 leading-5">
                {dataSoal.question}
              </h3>
            </div>
            {dataSoal.bundle_options.map((item, index) => {
              return (
                <div
                  key={index}
                  className={cn(
                    "cursor-pointer col-span-2 border-2 border-slate-100 my-2 px-4 py-2 rounded-lg font-medium hover:font-semibold hover:bg-primary hover:text-white hover:animate-pulse transition-all",
                    checkSelectedOption(item.id) ? "bg-blue-800 text-white" : ""
                  )}
                  onClick={() => handleOptionOnClick(item.id)}
                >
                  {item.name}
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
