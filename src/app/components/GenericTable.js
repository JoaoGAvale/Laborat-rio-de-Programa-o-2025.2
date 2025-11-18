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
    overflow-hidden border ${className}`}>
      <table className="w-full border-collapse text-left">
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
          {data.map((item, index) => (
            <tr
              key={item.id || index}
              className="border-t hover:bg-gray-100 transition"
            >
              {columns.map((column) => (
                <td key={column.key} className="p-3">
                  {column.render ? column.render(item) : item[column.key]}
                </td>
              ))}
              
              {actions.length > 0 && (
                <td className="p-3 flex items-center justify-center gap-4">
                  {actions.map((action, actionIndex) => (
                    <a
                      key={actionIndex}
                      href={action.getHref ? action.getHref(item) : `/${action.path}/${item.id}`}
                      className={action.className}
                      title={action.title}
                    >
                      {action.icon}
                    </a>
                  ))}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

