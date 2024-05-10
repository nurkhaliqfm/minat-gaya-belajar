import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AuthProvider from "./context/AuthProvider";
import Header from "@/components/layout/header";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/layout/footer";
import { CookiesProvider } from "next-client-cookies/server";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCHULER.ID | Development Mode",
  description:
    "Sistem Simulasi, Ujian Dan Analisis Peserta Didik By Schuler.id",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicons.svg" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <CookiesProvider>
            <main className="flex min-h-screen bg-gradient-to-tr from-blue-400 to-violet-600">
              <div className="flex flex-col flex-1 lg:ml-0 overflow-x-hidden">
                <Header />
                <div className="flex-1 mx-4 my-6">{children}</div>
                <Toaster />
                <Footer />
              </div>
            </main>
          </CookiesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
