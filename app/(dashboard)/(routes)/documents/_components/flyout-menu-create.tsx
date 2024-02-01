import React, { useState } from 'react';
import AppSVGIcon from "@/components/appsvgicon";
import { useParams, usePathname } from "next/navigation";

const FlyoutMenuCreate = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleButtonClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    const parentKey = usePathname();


    const setLocalStorageItem = (key: string, value: string) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error('Error setting local storage item:', error);
        }
    };

    const onCLickCreateFile = async() => {
        if(parentKey === '/documents'){
            location.href = "/documents/createfile";
        }else{
            setLocalStorageItem('parentKey', parentKey.replace('/documents/', '') + '/');
            location.href = "/documents/createfile";
        }
    }

    const onCLickCreateFolder = async() => {
        if(parentKey === '/documents'){
            location.href = "/documents/createfolder";
        }else{
            setLocalStorageItem('parentKey', parentKey.replace('/documents/', '') + '/');
            location.href = "/documents/createfolder";
        }
    }

    return (
        <div className="relative">
            <button onClick={handleButtonClick} type="button" className="block flex text-gray-600 rounded-md px-3 py-2 bg-gray-300 text-center text-sm font-semibold shadow-xl hover:bg-gray-200">
                <AppSVGIcon customclass={'h-5 w-5 text-gray-400'} icon={'plusIcon'}></AppSVGIcon>
                Create
            </button>

            {isMenuOpen && (
                <div className="absolute left-2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                    <div className="w-max shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <button onClick={() => onCLickCreateFile()} className="flex p-1 justify-start">
                            <AppSVGIcon customclass={'h-5 w-5 text-gray-400 mr-2'} icon={'fileIcon'}></AppSVGIcon>
                            Create File
                        </button>
                        <button onClick={() => onCLickCreateFolder()} className="flex p-1 justify-start">
                            <AppSVGIcon customclass={'h-5 w-5 text-gray-400 mr-2'} icon={'folderIcon'}></AppSVGIcon>
                            Create Folder
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlyoutMenuCreate;
