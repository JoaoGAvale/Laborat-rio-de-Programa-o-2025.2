'use client'

import React from "react";
import { Menu } from "lucide-react";

// src/app/components/Header.js
export default function Header({ onOpen }) {
  return (
    <header className="w-full fixed z-[1000] bg-green-400 text-gray-800 px-6 py-4 flex items-center justify-between shadow-md">
      <button onClick={onOpen} className="p-2">
        <Menu />
      </button>
      <h1 className="text-2xl font-bold">"Nome do Projeto"</h1>

      <nav className="flex items-center gap-6">
        <a href="/" className="hover:text-green-900 transition">Início</a>
        <a href="/doacoes" className="hover:text-green-900 transition">Doações</a>
        <a href="/sobre" className="hover:text-green-900 transition">Sobre</a>

        <button className="bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 transition">
          Entrar
        </button>
      </nav>
    </header>
  );
}