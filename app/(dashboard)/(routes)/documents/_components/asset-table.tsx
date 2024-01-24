"use client";
import React, { useCallback, useState } from "react";
import TreeNodeIcon from "./tree-node-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentFolderTree } from "../page";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { ContextMenuTrigger, ContextMenu, ContextMenuItem } from 'rctx-contextmenu';
import AppSVGIcon from "@/components/appsvgicon";

export interface FolderTreeProps {
    name: string;
    childrens?: FolderTreeProps[] | null;
    _id: string;
}

const basePath = process.env.BASE_PATH ?? "http://localhost:3000/";
const currentDocPath = basePath + "/documents/";
const AssetsTable = (props: any) => {
    const { folderStructure } = props;


    const formatDate = (dateTimeString: string) => {
        const options: Intl.DateTimeFormatOptions = {
            year: '2-digit',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
        };

        const formattedDate = new Date(dateTimeString).toLocaleString('en-US', options);

        return formattedDate;
    };

    return (
        <div className="px-4 sm:px-2 lg:px-4 py-4">
            <div className="sm:flex sm:items-center my-2">
                <div className="sm:flex-auto">
                    <h1 className="text-2xl font-semibold leading-6 text-gray-600 ">Document Hub</h1>
                </div>
                <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                    <ContextMenuTrigger
                        id="my-context-menu-2"
                    >
                        <button type="button" className="block flex text-gray-600 rounded-md px-3 py-2 bg-gray-300 text-center text-sm font-semibold shadow-xl hover:bg-gray-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            {/* <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                            </svg> */}
                            <AppSVGIcon customclass={'h-5 w-5 text-gray-400'} icon={'plusIcon'}></AppSVGIcon>
                            Create
                        </button>
                    </ContextMenuTrigger>
                </div>
            </div>
            <div className="mt-8 flow-root">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div className="relative">
                            <table className="min-w-full table-fixed divide-y divide-gray-300">
                                <thead>
                                    <tr>
                                        <th scope="col" className="relative px-8 sm:w-12 sm:px-6">
                                            <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                            <span className="min-w-[12rem] py-3 text-sm font-semibold text-gray-900">Type</span>
                                        </th>
                                        <th scope="col" className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900">Name</th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Created At</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white h-full">
                                    {folderStructure.subFolders.map((item: any, i: number) => {
                                        return (
                                            <tr key={i}>
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                    <div onClick={() => location.href = `${currentDocPath}${item.key}`} className="p-2 bg-pink-100 ml-3 rounded cursor-pointer">
                                                        {/* <svg className="mx-auto h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                        </svg> */}
                                                        <AppSVGIcon customclass={'mx-auto h-7'} icon={'folderIcon'}></AppSVGIcon>                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">{item.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                                                <td className="relative whitespace-nowrap px-3 text-sm text-gray-500 cursor-pointer">
                                                    <div className=" ">
                                                        <ContextMenuTrigger
                                                            id="my-context-menu-1"
                                                        >
                                                            {/* <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                                            </svg> */}
                                                            <AppSVGIcon customclass={'h-5'} icon={'contextMenuIcon'}></AppSVGIcon>
                                                        </ContextMenuTrigger>
                                                        <ContextMenu id="my-context-menu-1">
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'editIcon'}></AppSVGIcon>
                                                                    Edit
                                                                </div>
                                                            </ContextMenuItem>
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'renameIcon'}></AppSVGIcon>
                                                                    Rename
                                                                </div>
                                                            </ContextMenuItem>
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'deleteIcon'}></AppSVGIcon>
                                                                    Delete
                                                                </div>
                                                            </ContextMenuItem>
                                                        </ContextMenu>
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })}
                                    {folderStructure.files.map((item: any, i: number) => {
                                        return (
                                            <tr key={i}>
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                                                    <div onClick={() => location.href = `${currentDocPath}${item.key}`} className="p-2 bg-pink-100 ml-3 rounded cursor-pointer">
                                                        {/* <svg className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" stroke-width="0">
                                                            </g>
                                                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="#9ca3af" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                                                            </g>
                                                        </svg> */}
                                                        <AppSVGIcon customclass={'mx-auto h-7'} icon={'fileIcon'}></AppSVGIcon>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">{item.name + 'dd'}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                                                <td className="relative whitespace-nowrap px-3 text-sm text-gray-500 cursor-pointer">
                                                    <div className=" ">
                                                        <ContextMenuTrigger
                                                            id="my-context-menu-1"
                                                        >
                                                            {/* <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                <path d="M10 3a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM10 8.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM11.5 15.5a1.5 1.5 0 10-3 0 1.5 1.5 0 003 0z" />
                                                            </svg> */}
                                                            <AppSVGIcon customclass={'h-5'} icon={'contextMenuIcon'}></AppSVGIcon>
                                                        </ContextMenuTrigger>
                                                        <ContextMenu id="my-context-menu-1">
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                                                                        <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'editIcon'}></AppSVGIcon>
                                                                    Edit
                                                                </div>
                                                            </ContextMenuItem>
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path d="M7 3.5A1.5 1.5 0 018.5 2h3.879a1.5 1.5 0 011.06.44l3.122 3.12A1.5 1.5 0 0117 6.622V12.5a1.5 1.5 0 01-1.5 1.5h-1v-3.379a3 3 0 00-.879-2.121L10.5 5.379A3 3 0 008.379 4.5H7v-1z" />
                                                                        <path d="M4.5 6A1.5 1.5 0 003 7.5v9A1.5 1.5 0 004.5 18h7a1.5 1.5 0 001.5-1.5v-5.879a1.5 1.5 0 00-.44-1.06L9.44 6.439A1.5 1.5 0 008.378 6H4.5z" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'renameIcon'}></AppSVGIcon>
                                                                    Rename
                                                                </div>
                                                            </ContextMenuItem>
                                                            <ContextMenuItem>
                                                                <div className="flex">
                                                                    {/* <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                                                                        <path fill-rule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clip-rule="evenodd" />
                                                                    </svg> */}
                                                                    <AppSVGIcon customclass={'mr-3 h-5'} icon={'deleteIcon'}></AppSVGIcon>
                                                                    Delete
                                                                </div>
                                                            </ContextMenuItem>
                                                        </ContextMenu>
                                                    </div>
                                                </td>

                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>

                    </div>
                </div>
            </div>
            <ContextMenu id="my-context-menu-2">
                <ContextMenuItem>
                    <div className="flex" onClick={() => location.href = '/documents/createfile'}>
                        <svg className="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
                            <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
                        </svg>
                        File
                    </div>
                </ContextMenuItem>
                <ContextMenuItem>
                    <div className="flex items-center" onClick={() => location.href = '/documents/createfolder'}>
                        <svg className="mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                            <path vector-effect="non-scaling-stroke" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                        </svg>
                        Folder
                    </div>
                </ContextMenuItem>
            </ContextMenu>

        </div>

    );
};

export default AssetsTable;
