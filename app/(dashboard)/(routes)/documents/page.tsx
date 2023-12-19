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
  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  const createFolder = async () => {
    try {
      const response = await axios.post(`/api/documents/upload/folder`, {
        folderId:3,
        folderName:'Third Folder'
      });
    } catch (e) {
      console.log(e);
    }
  };
  const getFolder = async () => {
    const response = await axios.get(`/api/documents/list`);
    console.log(response.data.data);
    setFolderStructure(response.data.data);
  };
  useEffect(() => {
    getFolder();
  }, []);

  if (folderStructure == null) {
    return <div>Loading</div>;
  }

  const handleFileChange = (event: any) => {
    setFile(event.target.files[0]);
  };
  const handleFileUpload = async () => {
    try {
      const response = await axios.post(`/api/documents/upload/file`, {
        folderId:2,
        fileName:'onemore.xlxs'
      });
    } catch (e) {
      console.log(e);
    }
 
  };
  return (
    <div>
      <div className=" my-4 ml-2 flex">
        <h1 className="font-bold  mr-8">Root</h1>
        <input type="file" onChange={handleFileChange} />
        <div className="font-bold mr-3" onClick={handleFileUpload}>Upload File</div>
        <div className="font-bold mr-3" onClick={createFolder}>Create Folder</div>
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
