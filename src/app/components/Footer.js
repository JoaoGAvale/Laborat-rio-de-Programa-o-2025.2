'use client'

import React from "react";

// src/app/components/Footer.js
export default function Footer() {
  return (
    <footer className="w-full bg-gray-100 text-center py-4 text-sm text-gray-600 border-t">
      © {new Date().getFullYear()} Prato Solidário — Conectando quem doa e quem precisa.
    </footer>
  );
}
