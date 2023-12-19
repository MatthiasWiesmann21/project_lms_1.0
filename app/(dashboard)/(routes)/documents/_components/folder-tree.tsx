"use client";
import React, { useState } from "react";
import TreeNodeIcon from "./tree-node-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { DocumentFolderTree } from "../page";

export interface FolderTreeProps {
  name: string;
  childrens?: FolderTreeProps[] | null;
  _id: string;
}

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

  return (
    <div>
      {files.map((item) => {
        return (
          <div className="mt-2  flex">
            <Link href={`${pathname}/${item.key}`} className="flex">
              <TreeNodeIcon
                className="mr-2"
                name={item.name}
                isFolder={false}
              />
              {item.name}
            </Link>
          </div>
        );
      })}

      {subFolders.map((item) => {
        return (
          <div className="mt-2  flex">
            <Link href={`${pathname}/${item.key}`} className="flex">
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
