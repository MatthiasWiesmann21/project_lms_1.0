"use client";
import Link from "next/link";
import FolderTree, { FolderTreeProps } from "../_components/folder-tree";
import PathMaker from "../_components/path-maker";
import { useParams, usePathname } from "next/navigation";
import { headers } from "next/headers";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { DocumentFolderTree } from "../page";

type Params = {
  slug: string[];
};
const DocumentPage = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");

  const parentKey = usePathname();

  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  const createFolder = async () => {
    try {
      const response = await axios.post(`/api/documents/upload/folder`, {
        folderName: folderName,
        parentKey: parentKey.replace("/documents/", "") + "/", // remove documents and add slash at the end
      });
      setFolderName("");
    } catch (e) {
      console.log(e);
    }
  };
  const getFolder = async () => {
    console.log(
      "path",
      `/api/documents/list/?key=${parentKey.replace("/documents/", "")}`
    );
    const response = await axios.get(
      `/api/documents/list?key=${parentKey.replace("/documents/", "")}`
    );
    console.log(response.data.data);
    setFolderStructure(response.data.data);
  };
  useEffect(() => {
    getFolder();
  }, []);

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
      formData.append("parentKey", parentKey.replace("/documents/", "") + "/");

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

  if (folderStructure == null) {
    return <div> Loading</div>;
  }

  return (
    <div className="ml-2 ">
      <div className=" my-4  flex">
        <input type="file" onChange={handleFileChange} />
        <button className="mr-3 font-bold" onClick={handleFileUpload}>
          Upload File
        </button>

        <input
          type="text"
          value={folderName}
          className="  ml-2 mr-2 border-2 border-black"
          onChange={handleFolderNameChange}
        />
        <button className="mr-3 font-bold  " onClick={createFolder}>
          Create Folder
        </button>
      </div>
      <div className="my-4 ">
        <PathMaker />
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
