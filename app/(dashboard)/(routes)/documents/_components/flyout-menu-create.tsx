import React, { useState, useEffect } from "react";
import AppSVGIcon from "@/components/appsvgicon";
import { useParams } from "next/navigation";
import { FilePlus, FolderPlus, Plus, PlusIcon } from "lucide-react";

type Params = {
  id: string;
};

const FlyoutMenuCreate = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { id } = useParams() as Params;

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const targetElement = event.target as Element; // Cast event.target to Element
      // Close the flyout menu if clicked outside
      if (targetElement && !targetElement.closest(".flyout-menu")) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="flyout-menu relative" onClick={handleMenuClick}>
      <button
        onClick={handleButtonClick}
        type="button"
        className="flex rounded-md bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-600 shadow-md hover:bg-gray-100"
      >
        <PlusIcon />
        Create
      </button>

      {isMenuOpen && (
        <div className="absolute left-2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-max shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <button
              onClick={() => onCLickCreateFile()}
              className="flex justify-start py-1 group"
            >
              <FilePlus className="mr-1 group-hover:text-gray-400"/>
              <p className="group-hover:text-gray-400">Create File</p>
            </button>
            <button
              onClick={() => onCLickCreateFolder()}
              className="flex justify-start py-1 group"
            >
              <FolderPlus className="mr-1 group-hover:text-gray-400 "/>
              <p className="group-hover:text-gray-400">Create Folder</p>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenuCreate;
