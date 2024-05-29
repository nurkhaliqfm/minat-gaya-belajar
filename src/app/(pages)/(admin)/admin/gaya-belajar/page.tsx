"use client";

import { useState } from "react";
import { HashLoader } from "react-spinners";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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

const Line = dynamic(
  () => import("react-chartjs-2").then((mod) => mod.Doughnut),
  {
    ssr: false,
  }
);

const data = {
  labels: [
    "A - Gaya Belajar Visual",
    "B - Gaya Belajar Audio",
    "C - Gaya Belajar Kinestetik",
  ],
  datasets: [
    {
      label: "Test Gaya Belajar",
      data: [20, 59, 80],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
      ],
    },
  ],
};

export default function HasilGayaBelajar() {
  const [isLoading, setIsLoading] = useState(false);

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
  const dataHasil = [
    { name: "Taufik Syam", result: "A - Gaya Belajar Visual" },
    { name: "Syamsuddin", result: "B - Gaya Belajar Audio" },
    { name: "Alimuddin", result: "C - Gaya Belajar Kinestetik" },
    { name: "Susi Susanti", result: "A - Gaya Belajar Visual" },
    { name: "Alfian", result: "C - Gaya Belajar Kinestetik" },
    { name: "Aisyah", result: "A - Gaya Belajar Visual" },
    { name: "Nurul Awaliyah", result: "B - Gaya Belajar Audio" },
    { name: "Halim Gau", result: "C - Gaya Belajar Kinestetik" },
    { name: "Muhammad Ali", result: "B - Gaya Belajar Audio" },
    { name: "Raman Alimuddin", result: "C - Gaya Belajar Kinestetik" },
  ];

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

              <div className="grid lg:grid-cols-2 grid-cols-1 gap-2 mb-4">
                <Table className="rounded-md overflow-hidden my-5">
                  <TableHeader className="bg-secondary">
                    <TableRow>
                      <TableHead className="text-white text-center">
                        No.
                      </TableHead>
                      <TableHead className=" text-white text-center">
                        Nama
                      </TableHead>
                      <TableHead className="text-white text-center">
                        Hasil
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <>
                      {dataHasil.map((item: any, index: number) => {
                        return (
                          <TableRow
                            key={index}
                            className={`${
                              index % 2 === 1 ? "bg-slate-100" : ""
                            }`}
                          >
                            <TableCell className="text-center">
                              {index + 1}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.name}
                            </TableCell>
                            <TableCell className="text-center">
                              {item.result}
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </>
                  </TableBody>
                </Table>
                <div className="flex justify-center items-center">
                  {/* <div className="max-w-xl"> */}
                  <Line data={data} />
                  {/* </div> */}
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
