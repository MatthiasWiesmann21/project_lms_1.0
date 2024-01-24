import React from 'react';
import Image from 'next/image';
import folderIcon from '../assets/icons/folderIcon.svg'

const AppSVGIcon = ({ icon, customclass }: { icon: string, customclass: string }) => {
    const iconPath = `../assets/icons/${icon}.svg`;
    const iconImport = require(`../assets/icons/${icon}.svg`) as string;


    return (
        <Image className={`${customclass} max-w-fit`} src={iconImport} alt={icon} width={24} height={24} />
    );
};

export default AppSVGIcon;
