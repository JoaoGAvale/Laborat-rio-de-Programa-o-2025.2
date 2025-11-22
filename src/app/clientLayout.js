'use client'
import { useState } from 'react';
import { usePathname } from "next/navigation";
import Header from './components/Header';
import Sidebar from "./components/Sidebar";

export default function ClientLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <Header key={`${pathname} header`} onOpen={() => setOpen(true)} />
      <Sidebar key={`${pathname} sidebar`} open={open} onClose={() => setOpen(false)} />
      {children}
    </>
  );
}