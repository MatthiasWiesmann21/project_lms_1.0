"use client";
import { EmojiPicker } from "@/components/emoji-picker";
import axios from "axios";
import moment from "moment";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const Chat = () => {
  const path = usePathname();
  const id = path?.split("/")[path?.split("/")?.length - 1];
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const getChat = async () => {
    const response = await axios?.post(`/api/comment/list`, {
      liveEventId: id,
    });
    setChat(response?.data?.data);
    setInput("");
  };

  const postChat = async () => {
    if (input === "") return;
    const response = await axios?.post(`/api/comment/create`, {
      text: input,
      postId: null,
      parentCommentId: null,
      liveEventId: id,
    });
    if (response?.status === 200) getChat();
  };

  useEffect(() => {
    getChat();
  }, []);
  return (
    <div className="border-1 w-[30%] rounded border border-[#fff]">
      <p className="text-center">Stream Chat</p>
      <div className="w-full">
        <p className="text-center">Welcome to the chat room!</p>
        <div className="h-[400px] overflow-y-scroll">
          {chat?.map((each, index) => {
            const { createdAt, profile, text } = each;
            const { name } = profile;
            return (
              <p
                key={index}
                className={`${
                  index % 2 === 0 && "bg-[#777]"
                } my-[1%] rounded p-[1%]`}
              >
                <span className="font-light">
                  {moment(new Date(createdAt))?.format("HH:mm")}
                </span>
                <span className="mx-[5px] font-bold">{`${name} :`}</span>
                <span>{text}</span>
              </p>
            );
          })}
        </div>
        <textarea
          value={input}
          onChange={(e) => setInput(e?.target?.value)}
          className="w-full rounded p-[1%] outline-none"
          placeholder="Send a message"
        />
        <div className="flex w-full items-center justify-between">
          <EmojiPicker onChange={(e) => setInput(input + e)} />
          <button
            onClick={postChat}
            className="float-end m-[1%] m-[1%] w-[20%] rounded bg-[#762ca3] p-[1%]"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
