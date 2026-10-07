import type { ReactNode } from 'react'

interface Column<T extends object> {
  key: keyof T
  label: string
  render?: (value: T[keyof T], row: T) => ReactNode
}

interface AdminTableProps<T extends object> {
  columns: Column<T>[]
  data: T[]
}

export default function AdminTable<T extends object>({
  columns,
  data,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-[#E5E7EB] bg-white">
      <table className="w-full min-w-[700px] text-left">
        <thead className="border-b border-[#E5E7EB] bg-[#F8FAFC]">
          <tr>
            {columns.map((column) => (
              <th
                key={String(column.key)}
                className="px-5 py-4 text-xs font-bold uppercase tracking-wide text-[#6B7280]"
              >
                {column.label}
              </th>
            ))}
          </tr>
        </thead>

        <tbody className="divide-y divide-[#E5E7EB]">
          {data.map((row, index) => (
            <tr
              key={index}
              className="hover:bg-[#F8FAFC]"
            >
              {columns.map((column) => (
                <td
                  key={String(column.key)}
                  className="px-5 py-4 text-sm"
                >
                  {column.render
                    ? column.render(row[column.key], row)
                    : String(row[column.key] ?? '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}