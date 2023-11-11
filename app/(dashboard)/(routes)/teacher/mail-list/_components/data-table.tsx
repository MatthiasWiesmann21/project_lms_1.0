// components/DataTable.js
"use client"
import { ArrowDownUp } from 'lucide-react';
import React, { useState } from 'react';

type DataItem = {
  name: string;
  email: string;
  message: string;
  createdAt: Date;
};

interface DataTableProps<TData> {
  data: TData[]
}

type SortField ='name' | 'email' | 'message' | 'createdAt';

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
    <table className="min-w-full table-auto rounded-lg overflow-hidden border-1">
    <thead>
    <tr className="bg-gray-100">
      <th onClick={() => sortByField('name')} className="cursor-pointer px-4 py-2 w-1/4 text-left">
        <div className="flex items-center space-x-2">
          <span>Name</span>
          <ArrowDownUp size={18}/>
        </div>
      </th>
      <th onClick={() => sortByField('email')} className="cursor-pointer px-4 py-2 w-1/4 text-left">
        <div className="flex items-center space-x-2">
          <span>Email</span>
          <ArrowDownUp size={18} />
        </div>
      </th>
      <th onClick={() => sortByField('message')} className="cursor-pointer px-4 py-2 w-1/4 text-left">
        <div className="flex items-center space-x-2">
          <span>Message</span>
          <ArrowDownUp size={18}/>
        </div>
      </th>
      <th onClick={() => sortByField('createdAt')} className="cursor-pointer px-4 py-2 w-1/4 text-left">
        <div className="flex items-center space-x-2">
          <span>Created At</span>
          <ArrowDownUp size={18}/>
        </div>
      </th>
      <th className="px-4 py-2 w-1/4 text-left"></th>
    </tr>
  </thead>
    <tbody>
      {sortedData.map((item) => (
        <tr key={item.email} className="border-b">
          <td className="px-4 py-4 text-left text-sm">{item.name}</td>
          <td className="px-4 py-4 text-left text-sm">{item.email}</td>
          <td className="px-4 py-4 text-left text-sm">{item.message}</td>
          <td className="px-4 py-4 text-left text-sm">{new Date(item.createdAt).toLocaleString()}</td>
          <td className="px-4 py-4 text-left text-sm"><a href={mailTo(item.email)} className="px-1 py-1 rounded-md bg-blue-500 text-white hover:text-blue-200">
              Kontaktieren
            </a>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
  );
};

export default DataTable;
