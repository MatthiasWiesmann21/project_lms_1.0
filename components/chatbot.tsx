"use client";

import React, { useState } from 'react';
import { Button } from "./ui/button";

import ChatGptPage from "./chatgptpage"; // Importieren Sie Ihre ChatGptPage-Komponente
import { IconBadge } from './icon-badge';
import { MessagesSquare } from 'lucide-react';

const Chatbot = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [messages, setMessages] = useState([]); // Speichert den Chatverlauf

    const handleClose = () => {
        setIsChatOpen(false);
    }

    return (
        <div>
            <Button onClick={() => setIsChatOpen(!isChatOpen)} className="bg-emerald-500 p-2 h-12 w-12 hover:bg-emerald-600">
                <MessagesSquare />
            </Button>
            <div style={
                {
                    margin: 8,
                }
            } className={`fixed bottom-0 right-0 w-full md:w-[400px] border bg-neutral-800 border-none rounded-xl overflow-hidden transition-all duration-500 ${isChatOpen ? 'h-[520px]' : 'h-0'}`}>
                {isChatOpen && <ChatGptPage onClose={handleClose} />}
            </div>
        </div>
    );
}
 
export default Chatbot;
