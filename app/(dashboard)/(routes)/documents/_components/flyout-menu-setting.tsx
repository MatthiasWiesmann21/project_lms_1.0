import React, { useEffect } from "react";
import { FilesIcon, MoreVertical, PencilIcon, Trash2Icon, } from "lucide-react";

interface FlyoutMenuSettingProps {
  index: number;
  key: string | number;
  onRenameClick: () => void;
  onDeleteClick: () => void;
  onEditClick: () => void;
  isMenuOpen: any;
  setMenuOpen: any;
  type: string;
}

const FlyoutMenuSetting: React.FC<FlyoutMenuSettingProps> = ({
  index,
  key,
  onRenameClick,
  onDeleteClick,
  onEditClick,
  isMenuOpen,
  setMenuOpen,
  type,
}) => {
  const handleMenuClick = (e: React.MouseEvent) => {
    e?.stopPropagation();
  };

  const handleButtonClick = () => {
    if (`${index}${type}` === isMenuOpen) setMenuOpen("");
    else setMenuOpen(`${index}${type}`);
    console.log("i:", index);
  };

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
    <div className="flyout-create relative">
      <div onClick={handleButtonClick} className="cursor-pointer">
        <MoreVertical />
      </div>

      {isMenuOpen === `${index}${type}` && (
        <div
          className="absolute left-2 z-50 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4"
          onClick={handleMenuClick}
        >
          <div className="w-max shrink rounded-xl bg-white p-2 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
            {/* <a href="#" className="flex justify-start p-1"> */}
            <a onClick={onEditClick} className="flex justify-start p-1">
              <PencilIcon className="mr-3 h-6" size={18} />
              Edit
            </a>
            <button
              className="flex justify-start p-1"
              onClick={() => onRenameClick()}
            >
              <FilesIcon className="mr-3 h-5" size={18} />
              Rename
            </button>
            <button
              className="flex justify-start p-1"
              onClick={() => onDeleteClick()}
            >
              <Trash2Icon className="mr-3 h-5" size={18} />
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlyoutMenuSetting;
