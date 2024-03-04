import React from "react";
import { useParams } from "next/navigation";
import { FilePlus, FolderPlus, Plus, PlusCircle, PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

type Params = {
  id: string;
};

const FlyoutMenuCreate = () => {
  const { id } = useParams() as Params;


  const onCLickCreateFile = async () => {
    if (!id) {
      location.href = "/documents/createfile";
    } else {
      location.href = `/documents/${id}/createfile`;
    }
  };

  const onCLickCreateFolder = async () => {
    if (!id) {
      location.href = "/documents/createfolder";
    } else {
      location.href = `/documents/${id}/createfolder`;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border-2 border-gray-300" variant="outline">
        <PlusCircle className="h-5 w-5" />
        <span className="pr-2 pl-2 text-sm">Create</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onCLickCreateFile}>
        <FolderPlus className="h-5 w-5 mr-2" />
          Create File
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onCLickCreateFolder}>
          <FilePlus className="h-5 w-5 mr-2" />
          Create Folder
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlyoutMenuCreate;