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
    "K1 - Kecerdasan Verbal",
    "K2 - Kecerdasan Logis",
    "K3 - Kecerdasan Visual",
    "K4 - Kecerdasan Kinestetik",
    "K5 - Kecerdasan Musikal",
    "K6 - Kecerdasan Intepersonal",
    "K7 - Kecerdasan Intrapersonal",
    "K8 - Kecerdasan Naturalis",
  ],
  datasets: [
    {
      label: "Test Minat & Bakat",
      data: [20, 59, 80, 81, 56, 10, 22, 52],
      backgroundColor: [
        "rgb(255, 99, 132)",
        "rgb(54, 162, 235)",
        "rgb(255, 205, 86)",
        "rgb(90, 10, 200)",
        "rgb(54, 162, 235)",
        "rgb(75, 192, 192)",
        "rgb(153, 102, 255)",
        "rgb(255, 159, 64)",
      ],
    },
  ],
};

export default function HasilPeminatan() {
  const [isLoading, setIsLoading] = useState(false);
  const dataCategory = [
    {
      name: "K1 - Kecerdasan Verbal",
      keterangan:
        "Kecerdasan verbal-linguistik merupakan kemampuan yang dimiliki individu dalam berpikir dan menyelesaikan masalah dengan menggunakan bahasa, baik lisan maupun tulisan serta menciptakan sesuatu melalui bahasa tersebut.",
      rekomendasi:
        "Ilmu Pendidikan, Jurusan sastra, Filsafat, Ilmu Hubungan Internasional, Ilmu Komunikasi, Sosiologi & Ilmu Kesejahteraan Sosial (Sosiatri), pariwisata atau hukum, dan Psikologi",
    },
    {
      name: "K2 - Kecerdasan Logis",
      keterangan:
        "Kecerdasan ini memiliki pola pikir yang baik dengan menggunakan angka dan logika. Mereka dapat menganalisis dan menciptakan hipotesis, membuat klasifikasi, berpikir dalam pola sebab-akibat, dan mempunyai pandangan yang bersifat rasional",
      rekomendasi:
        "Jurusan akuntansi, matematika, sains, aktuaria, atau programmer.",
    },
    {
      name: "K3 - Kecerdasan Visual",
      keterangan:
        "Tipe kecerdasan ini biasanya punya kepekaan terhadap visual, keseimbangan, warna, garis, bentuk, dan ruang",
      rekomendasi: "Jurusan arsitektur, seni rupa, DKV, teknik, atau pilot.",
    },
    {
      name: "K4 - Kecerdasan Kinestetik",
      keterangan:
        "Kecerdasan ini merupakan kemampuan seseorang untuk menggunakan seluruh tubuh atau fisiknya untuk mengekspresikan ide dan perasaan, serta keterampilan menggunakan tangan untuk mengubah atau menciptakan sesuatu.",
      rekomendasi: "Atlet, penari, atau aktor dan aktris",
    },
    {
      name: "K5 - Kecerdasan Musikal",
      keterangan:
        "Kecerdasan musik memiliki kemampuan mengembangkan, mengekspresikan, serta menikmati musik dan suara. Biasanya mereka mudah banget menghapal nada lagu yang baru didegar, menguasai alat musik dan peka terhadap suara sumbang",
      rekomendasi:
        "Penyanyi, konduktor, komposer, guru musik, teknisi rekaman, penyanyi, pemain alat musik, penulis lagu, promotor musik, manajer perusahaan rekaman",
    },
    {
      name: "K6 - Kecerdasan Intepersonal",
      keterangan:
        "Kecerdasan interpersonal sangat peka terhadap perasaan disekelilingnya. Mereka bisa mengerti tentang perasaan, itensi, motivasi, watak, dan temperamen orang lain. Kepekaan mereka ini bisa membantu banget kalau ikut kegiatan sosial berkat empatinya yang tinggi",
      rekomendasi:
        "Perawat, kesehatan masyarakat, gizi, pendidikan, atau psikologi",
    },
    {
      name: "K7 - Kecerdasan Intrapersonal",
      keterangan:
        "Orang yang punya tipe ini sangat memahami dirinya sendiri. Mereka tahu apa yang perlu diintropeksi dari diri mereka sendiri. Selain punya kemampuan mengenal diri sendiri. Orang tipe ini juga dapat beradaptasi terhadap lingkungannya dengan mudah.",
      rekomendasi:
        "Guru, konselor, psikolog, ahli komunikasi, terapis, atau motivator",
    },
    {
      name: "K8 - Kecerdasan Naturalis",
      keterangan:
        "Orang yang punya kecerdasan naturalis biasanya memahami lingkungan dengan baik dan umumnya sangat peduli binatang",
      rekomendasi: "Dokter hewan, peternakan, kelautan atau kehutanan",
    },
  ];
  const dataHasil = [
    { name: "Taufik Syam", result: "K1 - Kecerdasan Verbal" },
    { name: "Syamsuddin", result: "K7 - Kecerdasan Intrapersonal" },
    { name: "Alimuddin", result: "K3 - Kecerdasan Visual" },
    { name: "Susi Susanti", result: "K4 - Kecerdasan Kinestetik" },
    { name: "Alfian", result: "K4 - Kecerdasan Kinestetik" },
    { name: "Aisyah", result: "K6 - Kecerdasan Intepersonal" },
    { name: "Nurul Awaliyah", result: "K2 - Kecerdasan Logis" },
    { name: "Halim Gau", result: "K3 - Kecerdasan Visual" },
    { name: "Muhammad Ali", result: "K1 - Kecerdasan Verbal" },
    { name: "Raman Alimuddin", result: "K2 - Kecerdasan Logis" },
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
                Hasil Test Minat & Bakat
              </h3>
              <p className="mb-2 leading-4 max-w-2xl">
                Berikut adalah data siswa yang telah mengerjakan test minat &
                bakat
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
