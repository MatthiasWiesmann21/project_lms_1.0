"use client";

import FolderTree, { FolderTreeProps } from "../_components/folder-tree";

import { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "../_components/asset-table";



const DocumentCreatePage = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [fileName, setFileName] = useState("");
  const [isPublic, setPublic] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    // Trigger the click event on the hidden input
    const fileInput = document.getElementById('fileInput');
    if (!fileInput || !fileInput.click) return;
    fileInput.click();
  };

  const handleFileUpload = async () => {
    if (file == null) {
      return;
    }
    try {
      const formData = new FormData();
      formData.append("file", file);

      // formData.append('parentKey', )
      const response = await axios.post(
        `/api/documents/upload/file`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      location.href = "/documents";
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="mx-4 my-4">
      <div className="sm:flex-auto my-2">
        <h1 className="text-2xl font-semibold leading-6 text-gray-600 ">Add a File</h1>
      </div>
      <div>
        <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">Name *</label>
        <div className="mt-1">
          <input type="name" name="name" id="name" onChange={(e) => setFileName(e.target.value)} className="block px-2 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6" placeholder="Please enter file name" />
        </div>
      </div>

      <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">File *</label>
      <button onClick={() => handleUploadButtonClick()} type="button" className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400">
        <input type="file" onChange={handleFileChange} className="hidden" id="fileInput" />
        <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 14v20c0 4.418 7.163 8 16 8 1.381 0 2.721-.087 4-.252M8 14c0 4.418 7.163 8 16 8s16-3.582 16-8M8 14c0-4.418 7.163-8 16-8s16 3.582 16 8m0 0v14m0-4c0 4.418-7.163 8-16 8S8 28.418 8 24m32 10v6m0 0v6m0-6h6m-6 0h-6" />
        </svg>
        <span className="mt-2 block text-sm font-semibold text-gray-900">Upload file</span>
      </button>
      <div className="flex items-center my-2">
        <button onClick={() => setPublic(!isPublic)} type="button" className={`${isPublic && "bg-sky-600"} ${!isPublic && "bg-gray-200"} relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`} role="switch" aria-checked="false" aria-labelledby="annual-billing-label">
          <span aria-hidden="true" className={`${isPublic && "translate-x-5"} ${!isPublic && "translate-x-0"} pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}></span>
        </button>
        <span className="ml-3 text-sm" id="annual-billing-label">
          <span className="font-medium text-gray-900">Public</span>
        </span>
      </div>
      <div className="flex flex-row-reverse mt-4">
        <button onClick={() => handleFileUpload()} type="button" className="rounded-md bg-sky-600 mx-2 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500">Save</button>
        <a href="/documents" type="button" className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</a>
      </div>
    </div>
  );
};

export default DocumentCreatePage;
