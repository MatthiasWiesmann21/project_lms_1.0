"use client";
import React, { useState } from "react";
import TreeNodeIcon from "./tree-node-icon";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface FolderTreeProps {
  name: string;
  childrens?: FolderTreeProps[] | null;
  _id: string;
}

const folderStructure: FolderTreeProps = {
  name: "Root Folder",
  _id: "root",
  childrens: [
    {
      name: "File1.xlxs",
      _id: "file1",
    },
    {
      name: "File2.txt",
      _id: "file2",
    },
    {
      name: "Subfolder1",
      _id: "subfolder1",
      childrens: [
        {
          name: "File3.txt",
          _id: "file3",
        },
        {
          name: "File4.ext",
          _id: "file4",
        },
      ],
    },
    {
      name: "Subfolder2",
      _id: "subfolder2",
      childrens: [
        {
          name: "Subfolder2.1",
          _id: "subfolder2.1",
          childrens: [
            {
              name: "File7.txt",
              _id: "file7",
            },
            {
              name: "File8.ext",
              _id: "file8",
            },
          ],
        },
      ],
    },
  ],
};

 
const FolderTree: React.FC<FolderTreeProps> = ({ name, childrens, _id }) => {
  const pathname =usePathname()
  const [isOpen, setIsOpen] = useState(false);
  const isFolder = !!childrens;

  const getRemoteFiles = ()=>{
    // CALL AWS S3 against the route
  }

  const toggleFolder = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="mt-2  flex" onClick={toggleFolder}>
        <Link href={`${pathname}/${_id}`} className="flex">
          <TreeNodeIcon className="mr-2" name={name} isFolder={isFolder} />{" "}
          {name}
        </Link>
      </div>
    
        <div style={{ marginLeft: "20px" }}>
          {isFolder
            ? childrens.map((child, index) => (
                <FolderTree
                  key={_id}
                  name={child.name}
                  _id={child._id}
                />
              ))
            : null}
        </div>
     
    </div>
  );
};

export default FolderTree;
