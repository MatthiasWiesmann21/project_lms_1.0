"use client";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import axios from "axios";
import moment from "moment";
import { MessageCircle, ThumbsUp } from "lucide-react";
import { ChatInputPost } from "./chatInput";
import { Button } from "@/components/ui/button";

const SubReply = ({ val, getPosts }: any) => (
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
              className="m-0 ml-[1.25rem] cursor-pointer"
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
  commentsCount,
  getPosts,
}: {
  id: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
  commentsCount: number;
  getPosts: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [commentCount, setCommentCount] = useState(3);
  const [isShowComments, setShowComments] = useState(false);
  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <div
          onClick={async () => {
            const response = await axios?.post(`/api/like/create`, {
              postId: id,
            });
            if (response?.status === 200) getPosts();
          }}
          className="m-2 flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
        >
          <ThumbsUp
            fill={!!currentLike ? "blue" : "#ffffff00"}
            className="mr-2"
          />
          {likesCount}
        </div>
        <Button className="cursor-pointer rounded-full p-4" size="lg" variant="secondary" onClick={() => setShowComments(true)}>
        <MessageCircle className="mr-1" />
          {`${commentsCount} Comments`}
        </Button>
      </div>
      <div className="flex justify-around">
        <UserAvatar src={user?.imageUrl} className="mr-2 mt-4" />
        <div className="w-[90%]">
          <ChatInputPost
            placeHolder={"Type your comment"}
            apiUrl="/api/comment/create"
            query={{
              postId: id,
              parentCommentId: null,
            }}
            className=""
            getPosts={getPosts}
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
                        getPosts={getPosts}
                      />
                    )
                )}
              </div>
              {commentCount < commentsWithLikes?.length - 1 && (
                <div className="flex items-center justify-center p-2">
                  <Button
                    onClick={() => setCommentCount(commentCount + 3)}
                    className="cursor-pointer text-center rounded-full p-6"
                    variant="secondary"
                    size="lg"
                  >
                    Show more +
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
