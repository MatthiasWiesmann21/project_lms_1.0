"use client";
import React, { useState } from "react";
import TreeNodeIcon from "./tree-node-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentFolderTree } from "../page";
import { Button } from "@/components/ui/button";

export interface FolderTreeProps {
  name: string;
  childrens?: FolderTreeProps[] | null;
  _id: string;
}

const basePath = process.env.BASE_PATH ?? "http://localhost:3000/";
const currentDocPath = basePath + "/documents/";
const FolderTree: React.FC<DocumentFolderTree> = ({
  name,
  files,
  subFolders,
  id,
  key,
}) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const getRemoteFiles = () => {
    // CALL AWS S3 against the route
  };

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };
  const handleDownload = () => {
    //TODO: Download logic here
  };

  return (
    <div>
      {files.map((item) => {
        return (
          <div className="mt-2  flex flex-row   items-center   ">
            <div className="flex   " onClick={handleDownload}>
              <TreeNodeIcon
                className="mr-2"
                name={item.name}
                isFolder={false}
              />
              {item.name}
            </div>
            <Button
              className="ml-2 bg-white font-bold text-black hover:bg-black hover:text-white"
              onClick={handleDownload}
            >
              Download
            </Button>
          </div>
        );
      })}

      {subFolders.map((item) => {
        return (
          <div className="mt-2  flex">
            <Link href={`${currentDocPath}${item.key}`} className="flex">
              <TreeNodeIcon className="mr-2" name={item.name} isFolder={true} />
              {item.name}
            </Link>
          </div>
        );
      })}
    </div>
  );
};

export default FolderTree;
