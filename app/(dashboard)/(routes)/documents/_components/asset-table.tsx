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
import { isTeacher } from "@/lib/teacher";
import { UserButton, useAuth } from "@clerk/nextjs";
import FlyoutMenuCreate from "./flyout-menu-create";
import FlyoutMenuSetting from "./flyout-menu-setting";

export interface FolderTreeProps {
    name: string;
    childrens?: FolderTreeProps[] | null;
    _id: string;
}

const basePath = process.env.BASE_PATH ?? "http://localhost:3000/";
const currentDocPath = basePath + "/documents/";
const AssetsTable = (props: any) => {
    const { folderStructure } = props;
    const { userId } = useAuth();
    const [downloading, setDownloading] = useState(false);

    const handleDownload = useCallback(async (key: string , name:string) => {
        //TODO: Download logic here
        setDownloading(true);
        const response = await axios.get(`/api/documents/download/file?key=${key}`);
        console.log(response.data.data);
    
        const downloadURL = response.data.data.downloadUrl;
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadURL;
        downloadLink.download = name;
        document.body.appendChild(downloadLink);
        console.log(downloadLink)
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        setDownloading(false);
      }, []);

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

                <div className={`${isTeacher(userId) ? 'block' : 'hidden'} mt-4 sm:ml-16 sm:mt-0 sm:flex-none`}>
                    <FlyoutMenuCreate></FlyoutMenuCreate>
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
                                            {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
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
                                                    {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                                                    <div onClick={() => location.href = `${currentDocPath}${item.key}`} className="p-2 bg-pink-100 ml-3 rounded cursor-pointer">
                                                        {/* <svg className="mx-auto h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                            <path vector-effect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                        </svg> */}
                                                        <AppSVGIcon customclass={'mx-auto h-7'} icon={'folderIcon'}></AppSVGIcon>                                                    </div>
                                                </td>
                                                <td onClick={() => location.href = `${currentDocPath}${item.key}`} className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 cursor-pointer">{item.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                                                <td className={`${!isTeacher(userId) && 'hidden'} relative whitespace-nowrap px-3 text-sm text-gray-500`}>
                                                    <div className=" ">
                                                        <FlyoutMenuSetting></FlyoutMenuSetting>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                    {folderStructure.files.map((item: any, i: number) => {
                                        return (
                                            <tr key={i}>
                                                <td className="relative px-7 sm:w-12 sm:px-6">
                                                    {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                                                    <div className="p-2 bg-pink-100 ml-3 rounded cursor-not-allowed">
                                                        {/* <svg className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                                            </g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </g>
                                                        </svg> */}
                                                        <AppSVGIcon customclass={'mx-auto h-7'} icon={'fileIcon'}></AppSVGIcon>
                                                    </div>
                                                </td>
                                                <td className="whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900 cursor-not-allowed">{item.name}</td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{formatDate(item.createdAt)}</td>
                                                <td className={`${!isTeacher(userId) && 'hidden'} relative whitespace-nowrap px-3 text-sm text-gray-500`}>
                                                    <div className=" ">
                                                    <FlyoutMenuSetting></FlyoutMenuSetting>
                                                    </div>
                                                </td>
                                                <td className={`${!isTeacher(userId) && 'hidden'} relative whitespace-nowrap px-3 text-sm text-gray-500 cursor-pointer`}>
                                                    <div className=" " onClick={() => handleDownload(item.key,item.name)}>
                                                        <AppSVGIcon customclass={'h-5'} icon={'downloadIcon'}></AppSVGIcon>
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
        </div>

    );
};

export default AssetsTable;
