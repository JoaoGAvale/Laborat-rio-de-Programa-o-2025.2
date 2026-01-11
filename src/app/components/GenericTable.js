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
              <th className="p-3 text-center">Ações</th>
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
                    <div
                      key={actionIndex}
                      onClick={action.onClick ? ()=>{action.onClick(item)} : ()=>{}}
                      className={action.className}
                      title={action.title}
                     >
                      {typeof action.icon === "function" ? action.icon(item) : action.item}
                    </div>
                  ))}
                  </div>
                </td>
              )}
            </tr>
          ))
          :
          <tr className=" hover:bg-gray-100 transition">
            <td 
              className="p-3 text-center"
              colSpan={columns.length + (actions.length > 0 ? 1 : 0)}
            >
                Sem dados.
            </td>
          </tr>
        }
        </tbody>
      </table>
    </div>
  );
}

