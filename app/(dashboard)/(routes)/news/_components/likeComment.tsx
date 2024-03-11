"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import moment from "moment";
import { ThumbsUp } from "lucide-react";
import { ChatInputPost } from "./chatInput";

const SubReply = ({ val, getPosts }: any) => {
  return (
    <div>
      <div className="flex">
        <UserAvatar
          className="mr-1 h-5 w-5 md:h-7 md:w-7"
          src={val?.profile.imageUrl}
        />
        <div className="w-full">
          <p>
            {val?.profile?.name}
            <span className="ml-5 text-[12px]">
              {moment(new Date(val?.createdAt))?.fromNow()}
            </span>
          </p>
          <p>{val?.text}</p>
          <div className="my-2 flex items-center">
            <div
              onClick={async () => {
                const response = await axios?.post(`/api/like/create`, {
                  commentId: val?.id,
                });
                if (response?.status === 200) getPosts();
              }}
              className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
            >
              <ThumbsUp
                fill={val?.currentCommentLike ? "blue" : "#ffffff00"}
                className="mr-2"
              />
              {val?.likes?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reply = ({
  val,
  id,
  getPosts,
}: {
  val: any;
  id: string;
  getPosts: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [showReplyInput, setShowReplyInput] = useState(false);
  return (
    <div>
      <div className="flex">
        <UserAvatar
          className="mr-1 h-5 w-5 md:h-7 md:w-7"
          src={val?.profile.imageUrl}
        />
        <div className="w-full">
          <p>
            {val?.profile?.name}
            <span className="ml-5 text-[12px]">
              {moment(new Date(val?.createdAt))?.fromNow()}
            </span>
          </p>
          <p>{val?.text}</p>
          <div className="my-2 flex items-center">
            <div
              onClick={async () => {
                const response = await axios?.post(`/api/like/create`, {
                  commentId: val?.id,
                });
                if (response?.status === 200) getPosts();
              }}
              className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
            >
              <ThumbsUp
                fill={val?.currentCommentLike ? "blue" : "#ffffff00"}
                className="mr-2"
              />
              {val?.likes?.length}
            </div>
            <p
              style={{ marginLeft: "1.25rem" }}
              className="m-0 cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </p>
          </div>
          {showReplyInput && (
            <div className="flex justify-center">
              <UserAvatar
                className="mr-1 mt-[2.5%] h-5 w-5 md:h-7 md:w-7"
                src={user?.imageUrl}
              />
              <div className="my-1 flex w-full flex-col">
                <ChatInputPost
                  placeHolder={"Type your comment"}
                  apiUrl="/api/comment/create"
                  query={{
                    postId: id,
                    parentCommentId: val?.id,
                  }}
                  className="-mt-[3%]"
                  getPosts={getPosts}
                />
              </div>
            </div>
          )}
          {val?.subCommentsWithLikes?.map((val: any) => (
            <SubReply key={val?.id} val={val} getPosts={getPosts} />
          ))}
        </div>
      </div>
    </div>
  );
};

const LikeComment = ({
  id,
  likesCount,
  currentLike,
  commentsWithLikes,
  getPosts,
}: {
  id: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  getPosts: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  return (
    <div>
      <div className="flex items-center justify-end py-3">
        <div
          onClick={async () => {
            const response = await axios?.post(`/api/like/create`, {
              postId: id,
            });
            if (response?.status === 200) getPosts();
          }}
          className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
        >
          <ThumbsUp
            fill={!!currentLike ? "blue" : "#ffffff00"}
            className="mr-2"
          />
          {likesCount}
        </div>
      </div>
      <div className="flex justify-center">
        <UserAvatar src={user?.imageUrl} className="mr-2 mt-4" />
        <div className="w-full">
          <ChatInputPost
            placeHolder={"Type your comment"}
            apiUrl="/api/comment/create"
            query={{
              postId: id,
              parentCommentId: null,
            }}
            className="pb-[15px]"
            getPosts={getPosts}
          />
          <div>
            {commentsWithLikes?.map((val: any) => (
              <Reply key={val?.id} val={val} id={id} getPosts={getPosts} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
