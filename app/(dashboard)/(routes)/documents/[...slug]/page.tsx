"use client";
import Link from "next/link";
import FolderTree, { FolderTreeProps } from "../_components/folder-tree";
import PathMaker from "../_components/path-maker";
import { usePathname } from "next/navigation";
import { headers } from "next/headers";
import { useRouter } from "next/router";
import { useEffect } from "react";
import axios from "axios";

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

const DocumentPage = () => {
  const create = async () => {
    try {
      const response = await axios.post(`/api/documents/upload`, {});
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = () => {
    create();
  };

  return (
    <div>
      <div className="my-4 ml-2" onClick={handleClick}>
        <PathMaker />
      </div>
      <div className="ml-2 ">
        <FolderTree
          name={folderStructure.name}
          _id={folderStructure._id}
          childrens={folderStructure.childrens}
        />
      </div>
    </div>
  );
};

export default DocumentPage;
