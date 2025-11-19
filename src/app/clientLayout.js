'use client'
import { useState } from 'react';
import Header from './components/Header';
import Sidebar from "./components/Sidebar";

export default function ClientLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Header onOpen={() => setOpen(true)} />
      <Sidebar open={open} onClose={() => setOpen(false)} />
      {children}
    </>
  );
}