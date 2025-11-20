import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
      <body className="antialiased bg-white text-gray-900">

        {/* NAVBAR vuelve aquí */}
        <Navbar />

        {/* CONTENIDO */}
        {children}

        {/* FOOTER vuelve aquí */}
        <Footer />

        {/* TOASTER global */}
        <Toaster
          position="top-center"
          toastOptions={{
            style: {
              background: "#fff",
              color: "#000",
              borderRadius: "10px",
              padding: "10px 16px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            },
            success: {
              iconTheme: {
                primary: "#db2777",
                secondary: "#fff",
              },
            },
          }}
        />
      </body>
    </html>
  );
}
