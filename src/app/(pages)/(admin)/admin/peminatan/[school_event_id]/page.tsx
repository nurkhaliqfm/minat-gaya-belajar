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

        const k1 = newData.filter(
          (item: StudentResult) => item.result === "K1 - Kecerdasan Verbal"
        );
        const k2 = newData.filter(
          (item: StudentResult) => item.result === "K2 - Kecerdasan Logis"
        );
        const k3 = newData.filter(
          (item: StudentResult) => item.result === "K3 - Kecerdasan Visual"
        );
        const k4 = newData.filter(
          (item: StudentResult) => item.result === "K4 - Kecerdasan Kinestetik"
        );
        const k5 = newData.filter(
          (item: StudentResult) => item.result === "K5 - Kecerdasan Musikal"
        );
        const k6 = newData.filter(
          (item: StudentResult) =>
            item.result === "K6 - Kecerdasan Intepersonal"
        );
        const k7 = newData.filter(
          (item: StudentResult) =>
            item.result === "K7 - Kecerdasan Intrapersonal"
        );
        const k8 = newData.filter(
          (item: StudentResult) => item.result === "K8 - Kecerdasan Naturalis"
        );

        const dataDiagram = {
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
              data: [
                k1.length,
                k2.length,
                k3.length,
                k4.length,
                k5.length,
                k6.length,
                k7.length,
                k8.length,
              ],
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
                Hasil Test Minat & Bakat
              </h3>
              <p className="mb-2 leading-4 max-w-2xl">
                Berikut adalah data siswa yang telah mengerjakan test minat &
                bakat
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
