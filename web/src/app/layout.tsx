import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import { UserProvider } from "@/app/context/userContext";

export const metadata: Metadata = {
  title: "ServiceHub",
  description: "Marketplace de servicios",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <UserProvider>
          <Navbar />

          {children}

          <Footer />
        </UserProvider>

        <Toaster position="top-center" />
      </body>
    </html>
  );
}
