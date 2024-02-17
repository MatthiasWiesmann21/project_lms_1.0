import React, { useEffect } from "react";
import { FilesIcon, MoreVertical, PencilIcon, Trash2Icon, } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface FlyoutMenuSettingProps {
  index: number;
  onRenameClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  isMenuOpen: any;
  setMenuOpen: any;
  type: string;
}

const FlyoutMenuSetting: React.FC<FlyoutMenuSettingProps> = ({
  onRenameClick,
  onDeleteClick,
  onEditClick,
  setMenuOpen,
}) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as Element; // Cast event.target to Element
      // Close the flyout menu if clicked outside
      if (targetElement && !targetElement.closest(".flyout-create")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
      <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="bg-transparent border-0" variant="outline">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={onEditClick}>
        <PencilIcon className="h-4 w-4 mr-2" />
          Edit
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onRenameClick}>
        <FilesIcon className="h-4 w-4 mr-2" />
          Rename
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onDeleteClick}>
        <Trash2Icon className="h-4 w-4 mr-2" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FlyoutMenuSetting;
