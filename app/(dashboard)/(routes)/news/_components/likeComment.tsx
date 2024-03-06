"use client";
import React, { useState } from "react";
import ThumbSvg from "./thumbSVG";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import { EmojiPicker } from "@/components/emoji-picker";
import axios from "axios";
import moment from "moment";

const postComment = async (params: any) => {
  if (params?.text === "") return;
  const response = await axios?.post(`/api/comment/create`, {
    ...params,
  });
  if (response?.status === 200) window?.location?.reload();
};

const SubReply = ({ val }: { val: any }) => {
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
                if (response?.status === 200) window?.location?.reload();
              }}
              className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
            >
              <ThumbSvg
                fill={val?.currentCommentLike ? "blue" : "#fff"}
                className="mr-[10px]"
              />
              {val?.likes?.length}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Reply = ({ val, id }: { val: any; id: string }) => {
  const user = useSelector((state: any) => state?.user);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [comment, setComment] = useState("");
  console.log(val);
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
                if (response?.status === 200) window?.location?.reload();
              }}
              className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
            >
              <ThumbSvg
                fill={val?.currentCommentLike ? "blue" : "#fff"}
                className="mr-[10px]"
              />
              {val?.likes?.length}
            </div>
            <p
              className="m-0 ml-5 cursor-pointer"
              onClick={() => setShowReplyInput(!showReplyInput)}
            >
              Reply
            </p>
          </div>
          {/* {true && ( */}
          {showReplyInput && (
            <div className="flex justify-center">
              <UserAvatar
                className="mr-1 h-5 w-5 md:h-7 md:w-7"
                src={user?.imageUrl}
              />
              <div className="my-1 flex w-full flex-col">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="border-b border-[#fff] outline-none"
                  value={comment}
                  onChange={(e) => setComment(e?.target?.value)}
                />
                <div className="relative flex items-center justify-between py-2">
                  <div className="">
                    <EmojiPicker onChange={(e) => setComment(comment + e)} />
                  </div>
                  <button
                    onClick={() =>
                      postComment({
                        text: comment,
                        postId: id,
                        parentCommentId: val?.id,
                      })
                    }
                    className="cursor-pointer rounded-[20px] border border-[#fff] p-[1%] px-[2%]"
                  >
                    Comment
                  </button>
                </div>
              </div>
            </div>
          )}
          {val?.subCommentsWithLikes?.map((val: any) => (
            <SubReply key={val?.id} val={val} />
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
}: {
  id: string;
  likesCount: number;
  currentLike: boolean;
  commentsWithLikes: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [comment, setComment] = useState("");

  return (
    <div>
      <div className="flex items-center justify-end py-3">
        <div
          onClick={async () => {
            const response = await axios?.post(`/api/like/create`, {
              postId: id,
            });
            if (response?.status === 200) window?.location?.reload();
          }}
          className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
        >
          <ThumbSvg
            fill={!!currentLike ? "blue" : "#fff"}
            className="mr-[10px]"
          />
          {likesCount}
        </div>
      </div>
      <div className="flex justify-center">
        <UserAvatar src={user?.imageUrl} className="mr-2" />
        <div className="flex w-full flex-col">
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-b border-[#fff] outline-none"
            value={comment}
            onChange={(e) => setComment(e?.target?.value)}
          />
          <div className="relative flex items-center justify-between py-2">
            <div className="">
              <EmojiPicker onChange={(e) => setComment(comment + e)} />
            </div>
            <button
              onClick={() =>
                postComment({
                  text: comment,
                  postId: id,
                  parentCommentId: null,
                })
              }
              className="cursor-pointer rounded-[20px] border border-[#fff] p-[1%] px-[2%]"
            >
              Comment
            </button>
          </div>
          <div>
            {commentsWithLikes?.map((val: any) => (
              <Reply key={val?.id} val={val} id={id} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
