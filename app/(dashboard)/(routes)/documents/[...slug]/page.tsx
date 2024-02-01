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
import AssetsTable from "./../_components/asset-table";

const DocumentPage = () => {
  const [file, setFile] = useState(null);
  const [folderName, setFolderName] = useState("");

  const parentKey = usePathname();

  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  const createFolder = async () => {
    if (folderName == null || folderName.length < 1) {
      return;
    }
    console.log({ folderName })
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
    const response = await axios.get(
      `/api/documents/list?key=${parentKey.replace("/documents/", "")}&isPublicDirectory=${true}`
    );
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
      {/* <div className=" my-4  flex-col">
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
      </div> */}
      <div className="my-4 ">
        <PathMaker />
      </div>
      <AssetsTable
        folderStructure={folderStructure}
        root={false}
      ></AssetsTable>
    </div>
  );
};

export default DocumentPage;
