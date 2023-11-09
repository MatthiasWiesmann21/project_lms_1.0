// components/DataTable.js
"use client"
import React, { useState } from 'react';

type DataItem = {
  email: string;
  createdAt: string; // oder Date, je nachdem wie Sie es handhaben möchten
};

interface DataTableProps<TData> {
  data: TData[]
}

type SortField = 'email' | 'createdAt';

export function DataTable<TData>({ data }: DataTableProps<TData>) {
  const [sortedData, setSortedData] = useState<DataItem[]>(data as DataItem[]);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortByField = (field: SortField) => {
    const newData = [...sortedData];
    newData.sort((a, b) => {
      if (a[field] < b[field]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[field] > b[field]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
    setSortedData(newData);
    setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
  };

  const mailTo = (email: string) => {
    return `mailto:${email}`;
  };

  return (
    <table className="min-w-full table-auto">
      <thead>
        <tr className="bg-gray-100">
          <th onClick={() => sortByField('email')} className="cursor-pointer px-4 py-2">Email</th>
          <th onClick={() => sortByField('createdAt')} className="cursor-pointer px-4 py-2">Created At</th>
          <th className="px-4 py-2"></th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((item) => (
          <tr key={item.email} className="border-b">
            <td className="px-4 py-2">{item.email}</td>
            <td className="px-4 py-2">{new Date(item.createdAt).toLocaleString()}</td>
            <td className="px-4 py-2"><a href={mailTo(item.email)} className="px-1 py-1 rounded-md bg-blue-500 text-white hover:text-blue-200">
                Email senden
              </a></td>
          </tr>
        ))}
      </tbody>
    </table>

  );
};

export default DataTable;
