import React, { useEffect, useState } from "react";

interface DisappearingMessageProps {
    children: React.ReactNode;
    duration?: number;
    classname?: string;
}

export default function DisappearingMessage({
    children,
    duration = 3000,
    classname,
}: DisappearingMessageProps) {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(false);
        }, duration);
        return () => {
            clearTimeout(timeout);
        };
    }, [duration]);

    return (
        <div className={`${visible ? "opacity-100" : "opacity-0" } w-max transition-opacity duration-500 ${classname}`}>
            {children}
        </div>
    );
}