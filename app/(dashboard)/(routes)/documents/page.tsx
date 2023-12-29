"use client";

import FolderTree, { FolderTreeProps } from "./_components/folder-tree";

import { useEffect, useState } from "react";
import axios from "axios";

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
    try {
      const response = await axios.post(`/api/documents/upload/folder`, {
        folderName: folderName,
      });
      setFolderName("");
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
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <div className=" my-4 ml-2 flex">
        <h1 className="mr-8  font-bold">Root</h1>
        <input type="file" onChange={handleFileChange} />
        <button className="mr-3 font-bold" onClick={handleFileUpload}>
          Upload File
        </button>

        <input type="text" className="  border-black border-2 mr-2 ml-2" onChange={handleFolderNameChange} />
        <button className="mr-3 font-bold  "  onClick={createFolder}>
          Create Folder
        </button>
      </div>
      <div className="ml-2 ">
        <FolderTree
          name={folderStructure.name}
          id={folderStructure.id}
          subFolders={folderStructure.subFolders}
          files={folderStructure.files}
          key={folderStructure.key}
        />
      </div>
    </div>
  );
};

export default DocumentPage;
