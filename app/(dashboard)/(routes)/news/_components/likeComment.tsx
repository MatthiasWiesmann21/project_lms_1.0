"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import moment from "moment";
import { MessageSquare, ThumbsUp } from "lucide-react";
import { ChatInputPost } from "./chatInput";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/check-language";
import thumb from "@/assets/icons/thumb.png";
import Image from "next/image";

const SubReply = ({ val, updateLikeComment }: any) => (
  <div>
    <div className="flex justify-between">
      <UserAvatar
        className="mr-3 max-h-64 min-h-64 min-w-64 max-w-64"
        src={val?.profile.imageUrl}
      />
      <div className="w-full">
        <div>
          <span className="font-500 text-[16px]">{val?.profile?.name}</span>
          <span className="ml-3 text-[12px]">
            {moment(new Date(val?.createdAt))?.fromNow()}
          </span>
        </div>
        <p className="break-words text-[14px]">{val?.text}</p>
        <div className="my-2 flex items-center">
          <div
            onClick={async () => {
              const response = await axios?.post(`/api/like/create`, {
                commentId: val?.id,
              });
              if (response?.status === 200)
                updateLikeComment(response?.data?.post);
            }}
            className="font-500 flex cursor-pointer items-center justify-between text-[14px]"
          >
            <Image alt="thumb" src={thumb} className="w-[20px]" />
            <span className="ml-2 mr-1">{val?.likes?.length}</span>
            Like
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Reply = ({
  val,
  id,
  updateLikeComment,
}: {
  val: any;
  id: string;
  updateLikeComment: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const currentLanguage = useLanguage();
  return (
    <div>
      <div className="flex justify-between">
        <UserAvatar
          className="mr-3 max-h-64 min-h-64 min-w-64 max-w-64"
          src={val?.profile?.imageUrl}
        />
        <div className="w-full">
          <div>
            <div>
              <span className="font-500 text-[16px]">{val?.profile?.name}</span>
              <span className="ml-3 text-[12px]">
                {moment(new Date(val?.createdAt))?.fromNow()}
              </span>
            </div>
            <text className="break-words text-[14px]">{val?.text}</text>
          </div>
          <div className="my-2 flex items-center">
            <div
              onClick={async () => {
                const response = await axios?.post(`/api/like/create`, {
                  commentId: val?.id,
                });
                if (response?.status === 200)
                  updateLikeComment(response?.data?.post);
              }}
              className="font-500 flex cursor-pointer items-center justify-between text-[14px]"
            >
              <Image alt="thumb" src={thumb} className="w-[20px]" />
              <span className="ml-2 mr-1">{val?.likes?.length}</span>
              Like
            </div>
            <div
              className="font-500 m-0 ml-[1.25rem] cursor-pointer text-[14px]"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              {`${val?.subCommentsWithLikes?.length} ${currentLanguage?.news_comments_reply_button_label}`}
            </div>
          </div>

          {val?.subCommentsWithLikes?.map((val: any) => (
            <SubReply
              key={val?.id}
              val={val}
              updateLikeComment={updateLikeComment}
            />
          ))}
          {showReplyInput && (
            <div className="flex items-center justify-between">
              <UserAvatar
                className="mr-3 max-h-64 min-h-64 min-w-64 max-w-64"
                src={user?.imageUrl}
              />
              <div className="w-full">
                <ChatInputPost
                  placeHolder={currentLanguage.news_comments_input_placeholder}
                  apiUrl="/api/comment/create"
                  query={{
                    postId: id,
                    parentCommentId: val?.id,
                  }}
                  className="w-full"
                  updateLikeComment={updateLikeComment}
                />
              </div>
            </div>
          )}
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
  commentsCount,
  updateLikeComment,
}: {
  id: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  commentsCount: number;
  updateLikeComment: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [commentCount, setCommentCount] = useState(3);
  const [isShowComments, setShowComments] = useState(true);
  const currentLanguage = useLanguage();
  return (
    <div className="mx-3">
      <div className="flex items-center justify-between py-3">
        <div
          onClick={async () => {
            const response = await axios?.post(`/api/like/create`, {
              postId: id,
            });
            if (response?.status === 200)
              updateLikeComment(response?.data?.post);
          }}
          
          className="m-2 flex cursor-pointer items-center justify-around "
        >
          <ThumbsUp className={!!currentLike ? "text-[#0a66c2] transition duration-200 ease-in-out" : "border-black transition duration-200 ease-in-out"} fill={!!currentLike ? "#0a66c2" : "transparent"}/>
          <span className="ml-2 mr-1">{likesCount}</span>
          Like
        </div>
        <div
          className="font-500 flex cursor-pointer items-center rounded-full p-3 text-sm bg-slate-200 hover:bg-slate-300 dark:bg-slate-800/50 dark:hover:bg-slate-700/80 transition duration-500 ease-in-out"
          onClick={() => setShowComments(!isShowComments)}
        >
          <MessageSquare className="mr-1 h-5 w-6" />
          {`${commentsCount} ${currentLanguage.news_comments_button_label}`}
        </div>
      </div>
      <div className="flex items-center justify-between">
        <UserAvatar
          src={user?.imageUrl}
          className="mr-3 max-h-64 min-h-64 min-w-64 max-w-64"
        />
        <div className="w-full">
          <ChatInputPost
            placeHolder={currentLanguage?.news_comments_input_placeholder}
            apiUrl="/api/comment/create"
            query={{
              postId: id,
              parentCommentId: null,
            }}
            className=""
            updateLikeComment={updateLikeComment}
          />
        </div>
      </div>
      {isShowComments && (
        <>
          <div className="w-full">
            {commentsWithLikes?.map(
              (val: any, index: number) =>
                index < commentCount && (
                  <Reply
                    key={val?.id}
                    val={val}
                    id={id}
                    updateLikeComment={updateLikeComment}
                  />
                )
            )}
          </div>
          {commentCount < commentsWithLikes?.length - 1 && (
            <div className="flex items-center justify-center p-2">
              <Button
                onClick={() => setCommentCount(commentCount + 3)}
                className="cursor-pointer rounded-full p-4 text-center"
                variant="secondary"
                size="lg"
              >
                {currentLanguage.news_comments_showmore_label}
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default LikeComment;
