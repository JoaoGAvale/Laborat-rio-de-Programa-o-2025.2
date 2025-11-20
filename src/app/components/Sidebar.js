'use client'

import React from "react";

// src/app/components/Sidebar.js
import { Home, Gift, User, Inbox, Menu } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  return (
    <>
    {open && (
      <div className="fixed inset-0 bg-black opacity-40 z-[3001]" onClick={onClose}/>
      )}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-[3002] p-4 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"} text-black`}>
        <nav className="flex flex-col gap-4">
          <button onClick={onClose} className="p-2">
            <Menu />
          </button>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition" href="/">
            <Home size={20}/> Início
          </a>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition" href="/doar">
            <Gift size={20}/> Registrar Doação
          </a>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition" href="/minhas-doacoes">
            <Inbox size={20}/> Minhas Doações
          </a>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition" href="/perfil">
            <User size={20}/> Meu Perfil
          </a>
        </nav>
      </aside>
    </>
  );
}
