'use client'
import "./globals.css";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";
import localFont from "next/font/local";

const poppins = localFont({
  src: [
    {
      path: "../../public/fonts/poppins/Poppins-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Bold.woff2",
      weight: "400",
      style: "bold",
    },
    {
      path: "../../public/fonts/poppins/Poppins-Italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-poppins",
});

export default function Layout({ children }) {
const [open, setOpen] = useState(false);

return (
<html lang="pt-BR">
<body className={`${poppins.variable} font-poppins bg-white`}>
<Header onOpen={() => setOpen(true)} />
<Sidebar open={open} onClose={() => setOpen(false)} />
<main className="flex-1 px-[10%] pt-[10%] bg-gray-50">{children}</main>
<Footer />
</body>
</html>
);
}
