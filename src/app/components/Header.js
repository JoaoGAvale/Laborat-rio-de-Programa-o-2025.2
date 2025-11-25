'use client'

import React, {useState, useEffect} from "react";
import { useRouter } from "next/navigation";
import { Menu, User } from "lucide-react";

// src/app/components/Header.js
export default function Header({ onOpen }) {

  const [usuario, setUsuario] = useState(null);
  const router = useRouter()
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
      if (user) {
        setUsuario(user);
      }
    }, []);

  return (
    <header className="w-full fixed z-[1000] bg-green-400 text-gray-800 px-6 py-4 flex items-center justify-between shadow-md font-['PoppinsRegular']">
      <div className="flex items-center gap-6">
        {usuario?
          <button onClick={onOpen} className="p-2">
            <Menu />
          </button>
          :
          ""
        }
        <h1 className="text-2xl font-bold text-nowrap">Prato Solidário</h1>
      </div>

      <nav className="flex items-center gap-6">
        <a href="/inicio" className="hover:text-green-900 transition">Início</a>
        

        {!usuario?
          <div key={"group botao e tooltip"} className="group">
            <button key={"Botao login"} className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition" onClick={()=>{router.push("/login")}}>
              Entrar
            </button>
            <div className="w-20 h-5 absolute opacity-0"/>
            <div className="pointer-events-none absolute top-[65px] right-[20px] z-[3100] w-fit px-4 py-2 bg-white shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] rounded-md opacity-0 group-hover:opacity-100 group-hover:pointer-events-auto">
              <a href="/cadastrar_usuario" className="text-green-800 cursor-pointer text-center w-fit hover:text-green-600 text-nowrap">
                Cadastrar
              </a>
            </div>
          </div>
          :
          <div className="flex items-center gap-6">
            <a href="/notificacoes" className="hover:text-green-900 transition">Notificações</a>
            <div className="flex items-center gap-1 cursor-pointer" onClick={()=>{router.push("/usuario")}}>
              <div className="p-2 bg-green-700 hover:bg-green-800 transition text-black rounded-full">
                <User size={23} />
              </div>
              {usuario?.nome}
            </div>
          </div>
        }
      </nav>
    </header>
  );
}