import React, { useState, useEffect } from "react";
import AppSVGIcon from "@/components/appsvgicon";
import { useParams, usePathname } from "next/navigation";

type Params = {
  id: string;
};

const FlyoutMenuCreate = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { id } = useParams() as Params;

  const handleButtonClick = () => {
    setMenuOpen(!isMenuOpen);
  };

  const parentKey = usePathname();

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

  const setLocalStorageItem = (key: string, value: string) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error("Error setting local storage item:", error);
    }
  };

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
        className="block flex rounded-md bg-gray-300 px-3 py-2 text-center text-sm font-semibold text-gray-600 shadow-xl hover:bg-gray-200"
      >
        <AppSVGIcon
          customclass={"h-5 w-5 text-gray-400"}
          icon={"plusIcon"}
        ></AppSVGIcon>
        Create
      </button>

      {isMenuOpen && (
        <div className="absolute left-2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
          <div className="w-max shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            <button
              onClick={() => onCLickCreateFile()}
              className="flex justify-start p-1"
            >
              <AppSVGIcon
                customclass={"h-5 w-5 text-gray-400 mr-2"}
                icon={"fileIcon"}
              ></AppSVGIcon>
              Create File
            </button>
            <button
              onClick={() => onCLickCreateFolder()}
              className="flex justify-start p-1"
            >
              <AppSVGIcon
                customclass={"h-5 w-5 text-gray-400 mr-2"}
                icon={"folderIcon"}
              ></AppSVGIcon>
              Create Folder
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenuCreate;
