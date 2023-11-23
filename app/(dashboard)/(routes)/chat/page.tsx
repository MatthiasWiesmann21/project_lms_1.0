"use client";

import useWindowSize from '@/hooks/use-window-size';
import { mdBreakpoint } from '@/utils/tailwind';
import { useUser } from '@clerk/nextjs';
import { Menu, X } from 'lucide-react';
import { use, useCallback, useEffect, useState } from 'react';
import { Chat, LoadingIndicator } from 'stream-chat-react';
import ChatChannel from './_components/ChatChannel';
import ChatSidebar from './_components/ChatSidebar';
import useInitializeChatClient from './_components/useInitializeChatClient';
import { registerserviceWorker } from '@/utils/serviceWorker';
import { set } from 'zod';


export default function ChatPage() {
    const chatClient = useInitializeChatClient();
    const { user } = useUser();

    const [chatsidebarOpen, setChatSidebarOpen] = useState(false);

    const windowSize = useWindowSize();
    const isLargeScreen = windowSize.width >= mdBreakpoint;

    useEffect(() => {
        if (windowSize.width >= mdBreakpoint) setChatSidebarOpen(false);
    }, [windowSize.width]);

    const handleSidebarOnClose = useCallback(() => {
        setChatSidebarOpen(false);
    }, []);

    useEffect(() => {
        async function setUpserviceWorker() {
            try {
                await registerserviceWorker();
            } catch (error) {
                console.log(error);
            }
        }
        setUpserviceWorker();
    }, []);

    if (!chatClient || !user) {
        return (
            <div className='h-full flex items-center justify-center'>
                <LoadingIndicator size={40}/>
            </div>
        )
    };


    return (
        <div className='h-full'>
            <Chat client={chatClient}>
                <div className="flex justify-center border-b p-3 md:hidden">
                    <button onClick={() => setChatSidebarOpen(!chatsidebarOpen)}>
                        {!chatsidebarOpen ? (
                            <span className='flex items-center gap-1'><Menu /> Menu</span>
                        ) : (
                            <X />
                        )}
                    </button>
                </div>
                <div className='flex flex-row h-full overflow-y-auto'>
                    <ChatSidebar user={user} show={isLargeScreen || chatsidebarOpen} onClose={handleSidebarOnClose}/>
                    <ChatChannel show={!chatsidebarOpen || chatsidebarOpen} hideChannelOnThread={!isLargeScreen}/>
                </div>
            </Chat>
        </div>
    );
}