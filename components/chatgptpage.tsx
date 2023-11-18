"use client";

import { useChat } from "ai/react";
import { useEffect, useRef } from "react";
import Textarea from "react-textarea-autosize";

interface ChatGptPageProps {
    onClose: () => void;
  }  

  const ChatGptPage: React.FC<ChatGptPageProps> = ({ onClose }) => {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    api: "/api/chatgpt/",
  });

  const messageEndRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      // @ts-ignore
      handleSubmit(event);
    }
  };

  return (
    <div className="bg-neutral-800 h-full flex flex-col">
      <div className="flex-1 overflow-y-auto p-2">
        <div className="text-white h-12 w-full bg-emerald-500 flex rounded-sm">
            <p className="pl-2 p-2 text-left text-xl">Chat with ChatGPT</p>
            <div className="pl-40 flex justify-end">
            <button onClick={onClose} className="">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6 text-white">
                    <path fillRule="evenodd" d="M6.293 6.293a1 1 0 011.414 0L12 10.586l4.293-4.293a1 1 0 111.414 1.414L13.414 12l4.293 4.293a1 1 0 01-1.414 1.414L12 13.414l-4.293 4.293a1 1 0 01-1.414-1.414L10.586 12 6.293 7.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            </div>
        </div>
        {messages.length !== 0 && (
          <div className="pt-5 space-y-5 mx-auto w-full">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-x-2">
                <div className={`h-12 w-12 rounded-lg ${message.role === "user" ? "bg-gray-500" : "bg-teal-500"}`}>
                <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-full h-full text-white p-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                </div>

                <p className={`rounded-lg p-3 w-full ${message.role === "user" ? "border-gray-500" : "border-teal-500"} text-white border-2 text-sm`}>
                  {message.content}
                </p>
              </div>
            ))}
          </div>
        )}
        <div ref={messageEndRef}></div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="p-2 bg-neutral-800"
      >
        <div className="relative flex items-center">
          <Textarea
            tabIndex={0}
            required
            rows={1}
            value={input}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            autoFocus
            placeholder="Send message..."
            spellCheck={false}
            className="w-full focus:outline-none shadow-teal-700 shadow-xl placeholder:text-gray-200 text-sm text-white p-4 pr-16 rounded-xl bg-neutral-600"
          />
          <button
            type="submit"
            className="absolute bg-teal-500 p-2 rounded-lg right-0 mr-5"
          >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-5 h-5 text-white">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
            </svg>
          </button>
        </div>
      </form>
    </div>
  );
}

export default ChatGptPage;



