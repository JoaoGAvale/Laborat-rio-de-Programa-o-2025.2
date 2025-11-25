'use client'

import React, {useState, useEffect} from "react";

// src/app/components/Sidebar.js
import { Home, Gift, Inbox, Menu, History } from "lucide-react";

export default function Sidebar({ open, onClose }) {
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUsuario(user);
    }
  }, []);
  return (
    <>
    {open && (
      <div className="fixed inset-0 bg-black opacity-40 z-[3001] font-['PoppinsRegular']" onClick={onClose}/>
      )}
      <aside key={"side_bar"} className={`fixed top-0 left-0 h-full w-76 bg-white shadow-xl z-[3002] p-4 transform transition-transform duration-300 ease-in-out ${
        open ? "translate-x-0" : "-translate-x-full"} text-black`}>
        <nav className="flex flex-col gap-4 font-['PoppinsRegular']">
          <button onClick={onClose} className="p-2">
            <Menu />
          </button>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition text-green-600 hover:text-green-800" href="/inicio">
            <Home size={27}/> Início
          </a>
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition text-green-600 hover:text-green-800" href="/historico_doacoes">
            <History size={27}/> Histórico
          </a>
          
          <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition text-green-600 hover:text-green-800" href="/acompanhar_doacoes">
            <Inbox size={27}/> Acompanhar Doação
          </a>
          {
            usuario?.perfil === "Receptor" ? 
            <>
              <a className="flex items-center gap-3 p-2 rounded hover:bg-green-100 transition text-green-600 hover:text-green-800" href="/reservar_doacao">
                <Gift size={27}/> Reservar Doação
              </a>
            </>
            :
            ""
          }
        </nav>
      </aside>
    </>
  );
}
