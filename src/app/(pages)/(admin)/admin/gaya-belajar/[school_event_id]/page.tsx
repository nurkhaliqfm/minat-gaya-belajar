"use client";

import { useEffect, useState } from "react";
import { HashLoader } from "react-spinners";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { StudentResult, columns } from "../column";
import { DataTable } from "../data-table";

import dynamic from "next/dynamic";
import "chart.js/auto";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

const Line = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

interface PropsTable {
  no: string;
  name: string;
  isKuliah: string;
  ket: string;
  result: string;
}

export default function HasilPeminatan({
  params,
}: {
  params: { school_event_id: number };
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [eventResult, setEventsResult] = useState<Array<StudentResult>>();
  const [dataDiagram, setDataDiagram] = useState<any>(null);
  const dataCategory = [
    {
      name: "A - Gaya Belajar Visual",
      keterangan:
        "Gaya Belajar Visual adalah proses pembelajaran yang mengandalkan pengelihatan sebagai penerima informasi dan pengetahuan. Seseorang yang memiliki gaya belajar visual akan mudah menerima gagasan, konsep, data dan informasi yang dikemas dalam bentuk gambar",
      rekomendasi:
        "Buat Catatanmu Sendiri yang Berwarna, Membuat Mind Map, Membuat Poin-poin Penting, dan Mengaitkan dan Merefleksikan Pelajaran dalam Kehidupan Sehari-hari.",
    },
    {
      name: "B - Gaya Belajar Audio",
      keterangan:
        "Gaya Belajar Auditori adalah proses pembelajaran yang mengandalkan pendengaran sebagai penerima informasi dan pengetahuan. Seseorang dengan tipe belajar seperti ini lebih memfokuskan mendengar pembicaraan guru atau dosen dengan baik dan jelas tanpa perlu tampilan visual saat belajar.",
      rekomendasi:
        "Gunakan Recorder, Bikin Kelompok Belajar, Cari Lingkungan yang Tenang, Menyuarakan Materi Pelajaran, Dengarkan Kembali Materi Melalui Rekaman atau Penjelasan Orang Lain",
    },
    {
      name: "C - Gaya Belajar Kinestetik",
      keterangan:
        "Gaya Belajar Kinestetik adalah proses pembelajaran yang mengandalkan sentuhan atau rasa untuk menerima informasi dan pengetahuan. Seseorang yang memiliki gaya belajar kinestetik cenderung suka melakukan, menyentuh, merasa, bergerak dan mengalami secara langsung.",
      rekomendasi:
        "Rajin Melakukan Praktik dan Juga Eksperimen, Mengunjungi Tempat Edukasi, Memanfaatkan Gerakan Tubuh, dan Belajar Bersama Teman.",
    },
  ];

  useEffect(() => {
    fetch("/api/event/result/school/" + params.school_event_id, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        let newData: any = [];
        res.data.forEach((item: any, index: number) => {
          const content = {
            no: `${index + 1}`,
            name: item.users.biodata_users.full_name,
            isKuliah:
              item.users.biodata_users.isKuliah === 0
                ? "Kuliah"
                : "Tidak Ingin Kuliah",
            ket: item.users.biodata_users.ket,
            result: item.ref_result.name,
          };
          newData.push(content);
        });

        console.log(newData);

        const a = newData.filter(
          (item: StudentResult) => item.result === "A - Gaya Belajar Visual"
        );
        const b = newData.filter(
          (item: StudentResult) => item.result === "B - Gaya Belajar Audio"
        );
        const c = newData.filter(
          (item: StudentResult) => item.result === "C - Gaya Belajar Kinestetik"
        );

        const dataDiagram = {
          labels: [
            "A - Gaya Belajar Visual",
            "B - Gaya Belajar Audio",
            "C - Gaya Belajar Kinestetik",
          ],
          datasets: [
            {
              label: "Test Gaya Belajar",
              data: [a.length, b.length, c.length],
              backgroundColor: [
                "rgb(255, 99, 132)",
                "rgb(54, 162, 235)",
                "rgb(255, 205, 86)",
              ],
            },
          ],
        };

        setDataDiagram(dataDiagram);
        setEventsResult(newData);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.school_event_id]);

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
            <section>
              <h3 className="font-semibold text-2xl">
                Hasil Test Gaya Belajar Siswa
              </h3>
              <p className="mb-2 leading-4 max-w-2xl">
                Berikut adalah data siswa yang telah mengerjakan test gaya
                belajar
              </p>
              {eventResult && (
                <div className="grid grid-cols-1 gap-2 mb-4">
                  <DataTable columns={columns} data={eventResult} />
                </div>
              )}
              <div className="flex justify-center items-center">
                <div className="lg:size-1/2 size-full">
                  {dataDiagram !== null && <Line data={dataDiagram} />}
                </div>
              </div>

              <div className="my-8">
                <h5 className="text-lg font-medium mb-2">
                  Penjelasan Tentang Kategori Minat & Bakat
                </h5>
                <div className="grid grid-cols-1 gap-y-2">
                  {dataCategory.map((item, index) => {
                    return (
                      <Accordion
                        key={`item-` + index}
                        type="single"
                        collapsible
                      >
                        <AccordionItem value="item-1" className="border-0">
                          <AccordionTrigger className=" hover:no-underline hover:border-2 hover:border-secondary hover:text-secondary hover:bg-white cursor-pointer bg-secondary text-white font-medium rounded-md px-6 py-4 text-left shadow-md">
                            {item.name}
                          </AccordionTrigger>
                          <AccordionContent className="bg-blue-50 rounded-b-lg px-6 py-4 border-0">
                            <p className="my-2">
                              <span className="font-semibold">Keterangan</span>{" "}
                              : {item.keterangan}
                            </p>
                            <p className="my-2">
                              <span className="font-semibold">Rekomendasi</span>{" "}
                              : {item.rekomendasi}
                            </p>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                      // <Popover key={`item-` + index}>
                      //   <PopoverTrigger className="hover:border-2 hover:border-secondary hover:text-secondary hover:bg-white cursor-pointer bg-secondary text-white font-medium rounded-md px-6 py-4 text-left shadow-md">
                      //     {item.name}
                      //   </PopoverTrigger>
                      //   <PopoverContent>
                      //     <p className="my-2">
                      //       <span className="font-semibold">Keterangan</span> :{" "}
                      //       {item.keterangan}
                      //     </p>
                      //     <p className="my-2">
                      //       <span className="font-semibold">Rekomendasi</span> :{" "}
                      //       {item.rekomendasi}
                      //     </p>
                      //   </PopoverContent>
                      // </Popover>
                    );
                  })}
                </div>
              </div>
            </section>
          )}
          <div></div>
        </section>
      </main>
    </>
  );
}
