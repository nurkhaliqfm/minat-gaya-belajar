import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "./context/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SCHULER.ID | Developement Mode",
  description: "Developed by codefm.my.id",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicons.svg" />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <main className="flex min-h-screen bg-slate-100">
            <div className="flex flex-col flex-1 lg:ml-0 overflow-x-hidden">
              <div className="flex-1">{children}</div>
              <Toaster />
              <Footer />
            </div>
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
