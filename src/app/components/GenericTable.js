'use client'

import React from "react";

export default function GenericTable({ 
  data, 
  columns, 
  actions = [],
  className = "",
  headerClassName = "bg-green-200 text-gray-900"
}) {
  return (
    <div className={`w-full max-w-5xl bg-white shadow-lg rounded-lg 
    overflow-hidden shadow-[0_0_4px_4px_rgba(0,0,0,0.1)] ${className} text-center`}>
      <table className="w-full border-collapse text-center">
        <thead className={headerClassName}>
          <tr>
            {columns.map((column) => (
              <th key={column.key} className="p-3">
                {column.label}
              </th>
            ))}
            {actions.length > 0 && (
              <th className="p-3 text-center">AÇÕES</th>
            )}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? data.map((item, index) => (
            <tr
              key={item.id || index}
              className=" hover:bg-gray-100 transition"
            >
              {columns.map((column) => (
                <td key={column.key} className="p-3">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              
              {actions.length > 0 && (
                <td className="p-3 align-middle"> {/* Centraliza verticalmente */}
                  <div className="flex items-center justify-center gap-4 h-full"> {/* h-full para ocupar altura total */}
                  {actions.map((action, actionIndex) => (
                    <a
                      key={actionIndex}
                      href={action.getHref ? action.getHref(item) : undefined}
                      onClick={action.onClick ? ()=>{action.onClick(item)} : ()=>{}}
                      className={action.className}
                      title={action.title}
                    >
                      {action.icon}
                    </a>
                  ))}
                  </div>
                </td>
              )}
            </tr>
          ))
          :
          <tr className=" hover:bg-gray-100 transition">
            <td className="p-3 flex items-center justify-center col-span-full w-full">
                Sem dados.
            </td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  );
}

