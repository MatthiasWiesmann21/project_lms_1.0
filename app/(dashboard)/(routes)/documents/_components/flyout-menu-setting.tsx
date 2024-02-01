import React, { useState } from 'react';
import AppSVGIcon from "@/components/appsvgicon";

const FlyoutMenuSetting = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const handleButtonClick = () => {
        setMenuOpen(!isMenuOpen);
    };

    return (
        <div className="relative">
            <div onClick={handleButtonClick} className='cursor-pointer'>
                <AppSVGIcon customclass={'h-5'} icon={'contextMenuIcon'}></AppSVGIcon>
            </div>

            {isMenuOpen && (
                <div className="absolute left-2 z-10 mt-5 flex w-screen max-w-min -translate-x-1/2 px-4">
                    <div className="w-max shrink rounded-xl bg-white p-4 text-sm font-semibold leading-6 text-gray-900 shadow-lg ring-1 ring-gray-900/5">
                        <a href="#" className="flex p-1 justify-start">
                            <AppSVGIcon customclass={'mr-3 h-5'} icon={'editIcon'}></AppSVGIcon>
                            Edit
                        </a>
                        <a href="#" className="flex p-1 justify-start">
                            <AppSVGIcon customclass={'mr-3 h-5'} icon={'renameIcon'}></AppSVGIcon>
                            Rename
                        </a>
                        <a href="#" className="flex p-1 justify-start">
                            <AppSVGIcon customclass={'mr-3 h-5'} icon={'deleteIcon'}></AppSVGIcon>
                            Delete
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FlyoutMenuSetting;
