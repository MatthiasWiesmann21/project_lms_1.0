"use client";


import { useState } from "react";
import axios from "axios";
import { FilePlus } from "lucide-react";

const DocumentCreatePage = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("");
  const [isPublic, setPublic] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };

  const handleUploadButtonClick = () => {
    // Trigger the click event on the hidden input
    const fileInput = document.getElementById("fileInput");
    if (!fileInput || !fileInput.click) return;
    fileInput.click();
  };

  const handleFileUpload = async () => {
    if (file == null) {
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("isPublic", `${isPublic}`);
      formData.append("name", `${fileName}`);
      formData.append("file", file);
      formData.append("parentKey", getLocalStorageItem("parentKey"));

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
      setLoading(false);
      removeLocalStorageItem("parentKey");
      location.href = "/documents";
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  const getLocalStorageItem = (key: string) => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : null;
    } catch (error) {
      console.error("Error getting local storage item:", error);
      return null;
    }
  };

  const removeLocalStorageItem = (key: string) => {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error("Error removing local storage item:", error);
    }
  };

  return (
    <div className="relative mx-4 my-5">
      <div className="my-2 sm:flex-auto">
        <h1 className="text-2xl font-semibold leading-6 text-gray-600 dark:text-gray-200">
          Add a File
        </h1>
      </div>
      <div>
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
        >
          Name *
        </label>
        <div className="mt-1">
          <input
            type="name"
            name="name"
            id="name"
            onChange={(e) => setFileName(e.target.value)}
            className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 dark:text-gray-300 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 dark:placeholder:text-gray-200 sm:text-sm sm:leading-6"
            placeholder="Please enter file name"
          />
        </div>
      </div>

      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
      >
        File *
      </label>
      <button
        onClick={() => handleUploadButtonClick()}
        type="button"
        className="relative block w-full rounded-lg border-2 border-dashed border-gray-300 p-12 text-center hover:border-gray-400"
      >
        <input
          type="file"
          onChange={handleFileChange}
          className="hidden"
          id="fileInput"
        />
        <FilePlus className="mx-auto text-gray-400" size={48}/>
        <span className="mt-2 block text-sm font-semibold text-gray-900 dark:text-gray-400">
          Upload file
        </span>
      </button>

      <label
        htmlFor="email"
        className="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-300"
      >
        {
          //@ts-ignore
          file?.name
        }
      </label>
      <div className="my-2 flex items-center">
        <button
          onClick={() => setPublic(!isPublic)}
          type="button"
          className={`${isPublic && "bg-sky-600 dark:bg-gray-600"} ${
            !isPublic && "bg-gray-200 dark:bg-gray-400"
          } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out`}
          role="switch"
          aria-checked="false"
          aria-labelledby="annual-billing-label"
        >
          <span
            aria-hidden="true"
            className={`${isPublic && "translate-x-5"} ${
              !isPublic && "translate-x-0"
            } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
          ></span>
        </button>
        <span className="ml-3 text-sm" id="annual-billing-label">
          <span className="font-medium text-gray-900 dark:text-gray-300">Public</span>
        </span>
      </div>
      <div className="mt-4 flex flex-row-reverse">
        <button
          onClick={() => handleFileUpload()}
          type="button"
          disabled={loading}
          className="mx-2 rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
        >
          {loading ? (
            <svg
              className="mr-3 flex h-5 w-5 animate-spin items-center justify-center text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.001 8.001 0 014.373 6H2v4.373zM13 4.373V2a8 8 0 018 8h-4.373A7.961 7.961 0 0113 4.373zm4.373 9.254A8.001 8.001 0 0113 20.627v-4.373h4.373z"
              ></path>
            </svg>
          ) : (
            <>Save</>
          )}
        </button>
        <a
          href="/documents"
          type="button"
          className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          Cancel
        </a>
      </div>
    </div>
  );
};

export default DocumentCreatePage;
