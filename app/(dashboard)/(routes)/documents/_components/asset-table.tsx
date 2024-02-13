"use client";
import React, { useCallback, useState } from "react";
import axios from "axios";
import AppSVGIcon from "@/components/appsvgicon";
import { isTeacher } from "@/lib/teacher";
import { useAuth } from "@clerk/nextjs";
import FlyoutMenuCreate from "./flyout-menu-create";
import FlyoutMenuSetting from "./flyout-menu-setting";
import Modal from "react-modal";

export interface FolderTreeProps {
  name: string;
  childrens?: FolderTreeProps[] | null;
  id: string;
}

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "300px",
  },
};

const currentDocPath = "/documents/";
const AssetsTable: React.FC = (props: any) => {
  const { folderStructure } = props;
  const { userId } = useAuth();
  const [downloading, setDownloading] = useState(false);
  const i = 0;
  const [newFileName, setNewFileName] = useState("");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [renamingItem, setRenamingItem] = useState<FolderTreeProps | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [isFolder, setIsFolder] = useState("");
  const [isRenameFolder, setIsRenameFolder] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  const handleRenameClick = (item: FolderTreeProps, isFolder: boolean) => {
    setRenamingItem(item);
    setIsRenameFolder(isFolder);
    openModal();
  };

  function closeModal() {
    setIsOpen(false);
  }

  const renameFolder = async () => {
    if (newFileName == null || renamingItem?.id == null) {
      return;
    }

    try {
      const response = await axios?.post(
        !isRenameFolder
          ? `/api/documents/edit/file`
          : `/api/documents/edit/folder`,
        {
          //@ts-ignore
          isPublic: renamingItem.isPublic,
          id: renamingItem.id,
          ...(!isRenameFolder
            ? {
              fileName: newFileName,
            }
            : {
              folderName: newFileName,
            }),
        }
      );
      location.reload();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteDirectory = async () => {
    console.log("here", renamingItem?.id == null, renamingItem);
    const isFile: Boolean = isFolder !== "folder";
    if (renamingItem?.id == null) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        isFile ? `/api/documents/delete/file` : `/api/documents/delete/folder`,
        {
          id: renamingItem.id,
        }
      );
      if (response.status === 200) {
        console.log("deleted successfully");
      } else {
        console.error("Failed to delete");
      }
      setLoading(false);
      location.reload();
      setIsFolder("");
    } catch (error) {
      console.error("Error deleting:", error);
      setLoading(false);
      setIsFolder("");
    }
  };

  const handleDownload = useCallback(async (key: string, name: string) => {
    //TODO: Download logic here
    setDownloading(true);
    const response = await axios.get(`/api/documents/download/file?key=${key}`);
    const { fileExtension } = response.data.data;
    
    const downloadURL = response.data.data.downloadUrl;
    const downloadLink = document.createElement("a");
    downloadLink.href = downloadURL;
    downloadLink.download = `name.${fileExtension}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);

    setDownloading(false);
  }, []);

  const formatDate = (dateTimeString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: "2-digit",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = new Date(dateTimeString).toLocaleString(
      "en-US",
      options
    );

    return formattedDate;
  };

  const onEditClick = (id: any, isFolder: Boolean) => {
    const obj = {
      id,
      action: "edit",
    };
    const str = JSON?.stringify(obj);
    const encoded = btoa(str);
    location.href = `/documents/${encoded}/${isFolder ? "createfolder" : "createfile"
      }`;
  };

  return (
    <div className="overflow-hidden px-4 py-4 sm:px-2 lg:px-4">
      <Modal
        isOpen={modalIsOpen && renamingItem !== null}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Rename Modal"
      >
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Rename *
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md border-0 px-2 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6"
              placeholder="Enter the new name"
              defaultValue={renamingItem?.name}
              onChange={(e) => {
                setNewFileName(e.target.value);
              }} // Set the default value to the current item's name
            />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="mx-2 rounded-md bg-slate-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-400"
            onClick={closeModal}
          >
            Cancel
          </button>
          <button
            type="button"
            className="mx-2 rounded-md bg-sky-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
            onClick={() => {
              // TODO: Save logic here
              renameFolder();
            }}
          >
            Save
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isFolder !== ""}
        onRequestClose={() => setIsFolder("")}
        style={customStyles}
        contentLabel="Rename Modal"
      >
        <div>
          <p>Are you sure you want to delete?</p>
        </div>
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            className="mx-2 rounded-md bg-slate-300 px-3.5 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-slate-400"
            onClick={() => setIsFolder("")}
          >
            Cancel
          </button>
          <button
            type="button"
            className="mx-2 rounded-md bg-red-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800"
            disabled={loading}
            onClick={() => {
              deleteDirectory();
            }}
          >
            {loading ? (
              <svg
                className="mr-3 flex h-5 w-5 animate-spin items-center justify-center text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.373A8.001 8.001 0 014.373 6H2v4.373zM13 4.373V2a8 8 0 018 8h-4.373A7.961 7.961 0 0113 4.373zm4.373 9.254A8.001 8.001 0 0113 20.627v-4.373h4.373z"
                ></path>
              </svg>
            ) : (
              <>Delete</>
            )}
          </button>
        </div>
      </Modal>
      <div className="my-2 sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold leading-6 text-gray-600 ">
            Document Hub
          </h1>
        </div>

        <div
          className={`${isTeacher(userId) ? "block" : "hidden"
            } mt-4 sm:ml-16 sm:mt-0 sm:flex-none`}
        >
          <FlyoutMenuCreate
            // index={i}
            key={`flyout-create-0`}
          // currentlyOpenIndex={currentlyOpenCreateFlyoutIndex}
          // setCurrentlyOpenIndex={setCurrentlyOpenCreateFlyoutIndex}
          />
        </div>
      </div>
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full overflow-y-scroll py-2 align-middle sm:px-6 lg:px-8">
            <div className="relative h-[29rem]">
              <table className="min-w-full table-fixed divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th scope="col" className="relative px-8 sm:w-12 sm:px-6">
                      {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                      <span className="min-w-[12rem] py-3 text-sm font-semibold text-gray-900">
                        Type
                      </span>
                    </th>
                    <th
                      scope="col"
                      className="min-w-[12rem] py-3.5 pr-3 text-left text-sm font-semibold text-gray-900"
                    >
                      Name
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created At
                    </th>
                  </tr>
                </thead>
                <tbody className="h-full divide-y divide-gray-200 bg-white">
                  {folderStructure?.subFolders?.map(
                    (item: any, i: number) =>
                      // isPublic
                      (isTeacher(userId) ? true : item?.isPublic) && (
                        <tr key={i}>
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                            <div
                              onClick={() =>
                                (location.href = `${currentDocPath}${item.id}`)
                              }
                              className="ml-3 cursor-pointer rounded bg-pink-100 p-2"
                            >
                              {/* <svg className="mx-auto h-7 w-7 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                            <path vector-effect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                                                        </svg> */}
                              <AppSVGIcon
                                customclass={"mx-auto h-7"}
                                icon={"folderIcon"}
                              ></AppSVGIcon>{" "}
                            </div>
                          </td>
                          <td
                            onClick={() =>
                              (location.href = `${currentDocPath}${item.id}`)
                            }
                            className="cursor-pointer whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900"
                          >
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </td>
                          <td
                            className={`${!isTeacher(userId) && "hidden"
                              } relative whitespace-nowrap px-3 text-sm text-gray-500`}
                          >
                            <div className=" ">
                              <FlyoutMenuSetting
                                type="folder"
                                index={i}
                                key={i?.toString()}
                                isMenuOpen={isMenuOpen}
                                setMenuOpen={setMenuOpen}
                                onRenameClick={() => {
                                  handleRenameClick(item, true);
                                }}
                                onDeleteClick={() => {
                                  setIsFolder("folder");
                                  setRenamingItem(item);
                                }}
                                onEditClick={() => onEditClick(item?.id, true)}
                              />
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                  {folderStructure?.files?.map(
                    (item: any, i: number) =>
                      // isPublic
                      (isTeacher(userId) ? true : item?.isPublic) && (
                        <tr key={i}>
                          <td className="relative px-7 sm:w-12 sm:px-6">
                            {/* <input type="checkbox" className="absolute left-1 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" /> */}
                            <div className="ml-3 cursor-not-allowed rounded bg-pink-100 p-2">
                              {/* <svg className="h-7 w-7 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g id="SVGRepo_bgCarrier" strokeWidth="0">
                                                            </g>
                                                            <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                                            <g id="SVGRepo_iconCarrier">
                                                                <path d="M9 17H15M9 13H15M9 9H10M13 3H8.2C7.0799 3 6.51984 3 6.09202 3.21799C5.71569 3.40973 5.40973 3.71569 5.21799 4.09202C5 4.51984 5 5.0799 5 6.2V17.8C5 18.9201 5 19.4802 5.21799 19.908C5.40973 20.2843 5.71569 20.5903 6.09202 20.782C6.51984 21 7.0799 21 8.2 21H15.8C16.9201 21 17.4802 21 17.908 20.782C18.2843 20.5903 18.5903 20.2843 18.782 19.908C19 19.4802 19 18.9201 19 17.8V9M13 3L19 9M13 3V7.4C13 7.96005 13 8.24008 13.109 8.45399C13.2049 8.64215 13.3578 8.79513 13.546 8.89101C13.7599 9 14.0399 9 14.6 9H19" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                                            </g>
                                                        </svg> */}
                              <AppSVGIcon
                                customclass={"mx-auto h-7"}
                                icon={"fileIcon"}
                              ></AppSVGIcon>
                            </div>
                          </td>
                          <td className="cursor-not-allowed whitespace-nowrap py-4 pr-3 text-sm font-medium text-gray-900">
                            {item.name}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {formatDate(item.createdAt)}
                          </td>
                          <td
                            className={`${!isTeacher(userId) && "hidden"
                              } relative whitespace-nowrap px-3 text-sm text-gray-500`}
                          >
                            <div className=" ">
                              <FlyoutMenuSetting
                                index={i}
                                type="file"
                                key={i?.toString()}
                                isMenuOpen={isMenuOpen}
                                setMenuOpen={setMenuOpen}
                                onRenameClick={() => {
                                  handleRenameClick(item, false);
                                }}
                                onDeleteClick={() => {
                                  setIsFolder("file");
                                  setRenamingItem(item);
                                }}
                                onEditClick={() => onEditClick(item?.id, false)}
                              />
                            </div>
                          </td>
                          <td
                            className={`relative cursor-pointer whitespace-nowrap px-3 text-sm text-gray-500`}
                          >
                            <div
                              className=" "
                              onClick={() =>
                                handleDownload(item.key, item.name)
                              }
                            >
                              <AppSVGIcon
                                customclass={"h-5"}
                                icon={"downloadIcon"}
                              ></AppSVGIcon>
                            </div>
                          </td>
                        </tr>
                      )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsTable;
