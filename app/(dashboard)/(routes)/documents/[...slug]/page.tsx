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
  const { slug } = useParams() as Params;
  

  const [folderStructure, setFolderStructure] =
    useState<DocumentFolderTree | null>(null);

  const create = async () => {
    try {
      const response = await axios.post(`/api/documents/upload`, {});
    } catch (e) {
      console.log(e);
    }
  };
  const getFolder = async () => {
    
    const response = await axios.get(`/api/documents/list/?key=${slug}`);
    console.log(response);
    setFolderStructure(response.data.data);
  };
  useEffect(() => {
    getFolder();
  }, []);
  const handleClick = () => {
    create();
  };
  if (folderStructure == null) {
    return <div> Loading</div>;
  }

  return (
    <div>
      <div className="my-4 ml-2" onClick={handleClick}>
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
