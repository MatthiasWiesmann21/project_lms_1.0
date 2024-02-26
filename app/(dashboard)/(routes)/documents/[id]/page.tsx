"use client";

import PathMaker from "../_components/path-maker";
import { usePathname, useParams } from "next/navigation";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import { DocumentFolderTree } from "../page";
import AssetsTable from "./../_components/asset-table";
import { useIsAdmin, useIsOperator } from "@/lib/roleCheck";
import { NextResponse } from "next/server";

const DocumentPage = () => {
  const [folderName, setFolderName] = useState("");
  const parentKey = usePathname();

  console.log({parentKey})

  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  // const isAdmin = useIsAdmin();
  // const isOperator = useIsOperator();

  // const canAccess = isAdmin || isOperator;

  // if (!canAccess) {
  //  return new NextResponse("Unauthorized", { status: 401 });
  // }

const createFolder = async () => {
  if (folderName == null || folderName.length < 1) {
    return;
  }
  console.log({ folderName });
  try {
    const parentKeyWithSlash = parentKey ? parentKey.replace("/documents/", "") + "/" : "";
    const response = await axios.post(`/api/documents/upload/folder`, {
      folderName: folderName,
      parentKey: parentKeyWithSlash,
    });
    setFolderName("");
  } catch (e) {
    console.log(e);
  }
};

  const getFolder = async () => {
    if (parentKey == null) {
      return;
    }
    const response = await axios.get(`/api/documents/list?key=${parentKey.replace('/documents/', '')}`);
    setFolderStructure(response.data.data);
  };
  useEffect(() => {
    getFolder();
  }, []);

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
      //@ts-ignore
       folderStructure={folderStructure} root={false}></AssetsTable>
    </div>
  );
};

export default DocumentPage;
