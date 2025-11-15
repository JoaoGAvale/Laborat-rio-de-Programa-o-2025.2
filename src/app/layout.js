'use client'
import "./globals.css";
import { useState } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Footer from "./components/Footer";


export default function Layout({ children }) {
const [open, setOpen] = useState(false);


return (
<html lang="pt-BR">
<body className="bg-gray-50">
<Header onOpen={() => setOpen(true)} />
<Sidebar open={open} onClose={() => setOpen(false)} />
<main className="flex-1 p-6">{children}</main>
<Footer />
</body>
</html>
);
}
