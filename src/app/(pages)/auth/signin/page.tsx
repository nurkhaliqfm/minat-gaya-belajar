"use client";

import "@/app/globals.css";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import { PiEyeSlash, PiEye, PiAt, PiLockKey } from "react-icons/pi";
import { signIn } from "next-auth/react";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";

export default function Signin() {
  const { toast } = useToast();

  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async () => {
    setIsLoading(true);

    try {
      const response = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });

      if (!response?.error) {
        setIsLoading(false);
        window.open("/", "_self");
      } else if (!response.ok) {
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Gagal Login",
          description: "Email atau password anda salah",
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <main className="h-full flex justify-center items-center p-4">
      <div className="bg-white md:w-[50vw] md:m-16 rounded-xl flex">
        <section className="flex flex-1 flex-col items-center justify-center w-full m-10 md:w-2/3 md:mx-16">
          <Image
            src="/schuler.id_2.png"
            alt="schuler.id"
            width={160}
            height={160}
            className="mt-4 mb-6"
          />
          <div className="flex flex-col my-2">
            <label htmlFor="email" className="text-xs text-primary font-medium">
              Alamat Email
            </label>
            <div className="relative">
              <div className="bg-primary rounded-l-lg p-4 absolute left-0 top-1/2 -translate-y-1/2">
                <PiAt className="text-primary-foreground scale-150" />
              </div>
              <input
                className="pl-16 w-full py-3 px-4 my-1 bg-secondary rounded-lg font-semibold outline-none focus:outline-primary focus:bg-secondary"
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="example@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="flex flex-col my-2">
            <label
              htmlFor="password"
              className="text-xs text-primary font-medium"
            >
              Kata Sandi
            </label>

            <div className="relative">
              <div className="bg-primary rounded-l-lg p-4 absolute left-0 top-1/2 -translate-y-1/2">
                <PiLockKey className="text-primary-foreground scale-150" />
              </div>
              <input
                className="pl-16 w-full py-3 px-4 rounded-lg my-1 font-semibold outline-none bg-secondary focus:outline-primary focus:bg-secondary"
                type={`${isPasswordShow ? "text" : "password"}`}
                name="password"
                value={password}
                placeholder="Masukkan Password"
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                required
              />
              {isPasswordShow ? (
                <PiEyeSlash
                  className="cursor-pointer scale-150 text-primary hover:text-primary-foreground duration-300 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setIsPasswordShow(!isPasswordShow)}
                />
              ) : (
                <PiEye
                  className="cursor-pointer scale-150 text-primary hover:text-primary-foreground duration-300 absolute right-3 top-1/2 -translate-y-1/2"
                  onClick={() => setIsPasswordShow(!isPasswordShow)}
                />
              )}
            </div>
          </div>
          {isLoading ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading
            </Button>
          ) : (
            <Button onClick={handleOnSubmit} variant="default">
              Login
            </Button>
          )}
        </section>
      </div>
    </main>
  );
}
