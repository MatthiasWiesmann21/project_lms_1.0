"use client";

import FolderTree, { FolderTreeProps } from "./_components/folder-tree";

import { useEffect, useState } from "react";
import axios from "axios";
import AssetsTable from "./_components/asset-table";

export type DocumentFolderTree = {
  name: string;
  id: string;
  key: string;
  subFolders: DocumentFolderTree[];
  files: DocumentFile[];
};
export type DocumentFile = {
  name: string;
  id: string;
  key: string;
  folder: DocumentFolderTree;
};

const DocumentPage = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");
  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  const createFolder = async () => {
    if (folderName == null || folderName.length < 1) {
      return;
    }
    try {
      const response = await axios.post(`/api/documents/upload/folder`, {
        folderName: folderName,
      });
      setFolderName("");
      await getFolder();
    } catch (e) {
      console.log(e);
    }
  };
  const getFolder = async () => {
    const response = await axios.get(`/api/documents/list`);
    console.log(response);
    setFolderStructure(response.data.data);
  };
  useEffect(() => {
    getFolder();
  }, []);

  if (folderStructure == null) {
    return <div>Loading</div>;
  }

  const handleFolderNameChange = (event: any) => {
    setFolderName(event.target.value);
  };
  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
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
      await getFolder();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="  ml-2 h-screen">
      {/* <div className=" my-4  flex flex-col">
        <form className="flex">
          <input
            required
            type="file"
            className=" mr-6  w-2/6"
            onChange={handleFileChange}
          />
          <button
            className="flex items-center justify-center rounded-md bg-emerald-400  px-10 py-2 text-lg text-white hover:bg-emerald-400/80"
            onClick={handleFileUpload}
          >
            Upload File
          </button>
        </form>
        <form className="my-4 flex ">
          <input
            type="text"
            value={folderName}
            className=" mr-6   w-2/6 border-2 border-black"
            onChange={handleFolderNameChange}
            required
          />
          <button
            type="submit"
            className="flex items-center justify-center rounded-md bg-emerald-400 px-10 py-2 text-lg text-white hover:bg-emerald-400/80"
            onClick={createFolder}
          >
            Create Folder
          </button>
        </form>
      </div>
      <h1 className="mb-4 font-bold">Root</h1>

      <div className="  ">
        <FolderTree
          name={folderStructure.name}
          id={folderStructure.id}
          subFolders={folderStructure.subFolders}
          files={folderStructure.files}
          key={folderStructure.key}
        />
      </div> */}
      <AssetsTable
        folderStructure={folderStructure}
      ></AssetsTable>
    </div>
  );
};

export default DocumentPage;
