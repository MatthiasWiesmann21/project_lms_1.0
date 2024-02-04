"use client";

import FolderTree, { FolderTreeProps } from "../../_components/folder-tree";

import { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "../../_components/asset-table";
import { useParams, usePathname } from "next/navigation";
import PathMaker from "../../_components/path-maker";


type Params = {
    id: string;
};

const DocumentCreatePage = () => {
    const [file, setFile] = useState(null);
    const [folderName, setFolderName] = useState("");
    const [fileName, setFileName] = useState("");
    const [isPublic, setPublic] = useState(false);

    const { id } = useParams() as Params;

    const handleFileChange = (event: any) => {
        setFile(event.target.files[0]);
    };

    const createFolder = async () => {
        if (folderName == null || folderName.length < 1) {
            return;
        }
        try {
            const response = await axios.post(`/api/documents/upload/folder`, {
                folderName: folderName,
                isPublic: isPublic,
                id: id,
            });
            removeLocalStorageItem('parentKey')
            location.href = `/documents/${id}`;
            setFolderName("");
        } catch (e) {
            console.log(e);
        }
    };

    const getLocalStorageItem = (key: string) => {
        try {
            const storedValue = localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : null;
        } catch (error) {
            console.error('Error getting local storage item:', error);
            return null;
        }
    };


    const removeLocalStorageItem = (key: string) => {
        try {
            localStorage.removeItem(key);
        } catch (error) {
            console.error('Error removing local storage item:', error);
        }
    };

    return (
        <div className="mx-4 my-4">
            <div className="my-4 ">
                <PathMaker />
            </div>
            <div className="sm:flex-auto my-2">
                <h1 className="text-2xl font-semibold leading-6 text-gray-600 ">Create a Folder</h1>
            </div>
            <div>
                <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name *</label>
                <div className="mt-1">
                    <input type="name" name="name" id="name" onChange={(e) => setFolderName(e.target.value)} className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Please enter folder name" />
                </div>
            </div>
            <div className="flex items-center my-2">
                <button onClick={() => setPublic(!isPublic)} type="button" className={`${isPublic && "bg-sky-600"} ${!isPublic && "bg-gray-200"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`} role="switch" aria-checked="false" aria-labelledby="annual-billing-label">
                    <span aria-hidden="true" className={`${isPublic && "translate-x-5"} ${!isPublic && "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
                </button>
                <span className="ml-3 text-sm" id="annual-billing-label">
                    <span className="font-medium text-gray-900">Public</span>
                </span>
            </div>
            <div className="flex flex-row-reverse mt-4">
                <button onClick={() => createFolder()} type="button" className="rounded-md bg-sky-600 mx-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500">Create</button>
                <a href="/documents" type="button" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</a>
            </div>
        </div>
    );
};

export default DocumentCreatePage;
