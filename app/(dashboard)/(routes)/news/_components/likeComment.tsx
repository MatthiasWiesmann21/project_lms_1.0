"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import moment from "moment";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { ChatInputPost } from "./chatInput";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/check-language";

const SubReply = ({ val, updateLikeComment }: any) => (
  <div>
    <div className="flex justify-around">
      <UserAvatar
        className="mr-1 h-5 w-5 md:h-7 md:w-7"
        src={val?.profile.imageUrl}
      />
      <div className="w-[90%]">
        <p>
          {val?.profile?.name}
          <span className="ml-5 text-[12px]">
            {moment(new Date(val?.createdAt))?.fromNow()}
          </span>
        </p>
        <p className="break-words">{val?.text}</p>
        <div className="my-2 flex items-center">
          <div
            onClick={async () => {
              const response = await axios?.post(`/api/like/create`, {
                commentId: val?.id,
              });
              if (response?.status === 200)
                updateLikeComment(response?.data?.post);
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
      <div className="flex justify-around">
        <UserAvatar
          className="mr-1 h-5 w-5 md:h-7 md:w-7"
          src={val?.profile.imageUrl}
        />
        <div className="w-[90%] pr-[1%]">
          <p>
            {val?.profile?.name}
            <span className="ml-5 text-[12px]">
              {moment(new Date(val?.createdAt))?.fromNow()}
            </span>
          </p>
          <text className="break-words">{val?.text}</text>
          <div className="my-2 flex items-center">
            <div
              onClick={async () => {
                const response = await axios?.post(`/api/like/create`, {
                  commentId: val?.id,
                });
                if (response?.status === 200)
                  updateLikeComment(response?.data?.post);
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
              className="m-0 ml-[1.25rem] cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              {currentLanguage.news_comments_reply_button_label}
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
                  placeHolder={currentLanguage.news_comments_input_placeholder}
                  apiUrl="/api/comment/create"
                  query={{
                    postId: id,
                    parentCommentId: val?.id,
                  }}
                  className="-mt-[3%]"
                  updateLikeComment={updateLikeComment}
                />
              </div>
            </div>
          )}
          {val?.subCommentsWithLikes?.map((val: any) => (
            <SubReply
              key={val?.id}
              val={val}
              updateLikeComment={updateLikeComment}
            />
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
  const [isShowComments, setShowComments] = useState(false);
  const currentLanguage = useLanguage();
  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <div
          onClick={async () => {
            const response = await axios?.post(`/api/like/create`, {
              postId: id,
            });
            if (response?.status === 200)
              updateLikeComment(response?.data?.post);
          }}
          className="m-2 flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
        >
          <ThumbsUp
            fill={!!currentLike ? "blue" : "#ffffff00"}
            className="mr-2"
          />
          {likesCount}
        </div>
        <Button
          className="cursor-pointer rounded-full p-4"
          size="lg"
          variant="secondary"
          onClick={() => setShowComments(true)}
        >
          <MessageCircle className="mr-1" />
          {`${commentsCount} ${currentLanguage.news_comments_button_label}`}
        </Button>
      </div>
      <div className="flex justify-around">
        <UserAvatar src={user?.imageUrl} className="mr-2 mt-4" />
        <div className="w-[90%]">
          <ChatInputPost
            placeHolder={currentLanguage.news_comments_input_placeholder}
            apiUrl="/api/comment/create"
            query={{
              postId: id,
              parentCommentId: null,
            }}
            className=""
            updateLikeComment={updateLikeComment}
          />
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
                    className="cursor-pointer rounded-full p-6 text-center"
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
      </div>
    </div>
  );
};

export default LikeComment;
