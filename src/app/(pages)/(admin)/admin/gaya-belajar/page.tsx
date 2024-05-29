"use client";

import { useState } from "react";
import { HashLoader } from "react-spinners";
import { useCookies } from "next-client-cookies";

export default function HasilGayaBelajar() {
  const [isLoading, setIsLoading] = useState(false);

  // create array list with random name and result. choose the result from [K1 - Kecerdasan Verbal,K2 - Kecerdasan Logis,K3 - Kecerdasan Visual,K4 - Kecerdasan Kinestetik,K5 - Kecerdasan Musikal,K6 - Kecerdasan Intepersonal,K7 - Kecerdasan Intrapersonal,K8 - Kecerdasan Naturalis,A - Gaya Belajar Visual,B - Gaya Belajar Audio,C - Gaya Belajar Kinestetik]

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
              <h3 className="font-semibold text-3xl mb-2">
                Hasil Test Gaya Belajar Siswa
              </h3>
            </>
          )}
          <div></div>
        </section>
      </main>
    </>
  );
}
