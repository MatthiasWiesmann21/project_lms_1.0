"use client";
import React, { useState } from "react";
import ThumbSvg from "./thumbSVG";
import { useSelector } from "react-redux";
import { UserAvatar } from "@/components/user-avatar";
import { EmojiPicker } from "@/components/emoji-picker";

const comments = [
  "This stuff is better than PAID courses on blockchain development and Solidity smart contracts.  Even though I do have experience in this space, you are absolutely correct, Mr. Collins, when you say we need a refresher.  I have no words to describe the level of appreciation I have for your contributions in this space.  Thank you!",
  "That's Sprit Mr. Collins. I watched paid video of some blockchain Guru, who yell like old woman during instruction (and I confuse )",
  "Thanks Partick!❤",
  "I fully agree. I spent a thousand bucks for an online academy just to find myself with outdated and half hearted courses and rather poor support. This course is free and sooooo much better. Thank you",
  "@PatrickAlphaC  surely sir you will",
  "@learnmusicwithtom what was the course?",
  "big respect  @PatrickAlphaC",
];

const SubReply = () => <></>;

const Reply = ({
  each,
  index,
  clicked,
  setClicked,
}: {
  each: String;
  index: number;
  clicked: number;
  setClicked: any;
}) => {
  const user = useSelector((state: any) => state?.user);
  const [likeCount, setLikeCount] = useState(0);
  return (
    <div>
      <div className="flex">
        <UserAvatar
          className="mr-1 h-5 w-5 md:h-7 md:w-7"
          src={user?.imageUrl}
        />
        <div className="w-full">
          <p>{each}</p>
          <div className="my-2 flex items-center">
            <div
              onClick={() => setLikeCount(likeCount + 1)}
              className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
            >
              <ThumbSvg
                fill={!!likeCount ? "blue" : "#fff"}
                className="mr-[10px]"
              />
              {likeCount}
            </div>
            <p
              className="m-0 ml-5 cursor-pointer"
              onClick={() => setClicked(index)}
            >
              Reply
            </p>
          </div>
          {index === clicked && (
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
                />
                <div className="relative my-1 flex items-center justify-between">
                  <div className="">
                    <EmojiPicker onChange={() => {}} />
                  </div>
                  <button className="cursor-pointer rounded-[20px] border border-[#fff] p-[1%] px-[2%]">
                    Comment
                  </button>
                </div>
                <SubReply />
              </div>
            </div>
          )}
          {comments?.map((each, index2) => (
            <div key={index + index2}>
              <div className="flex">
                <UserAvatar
                  className="mr-1 h-5 w-5 md:h-7 md:w-7"
                  src={user?.imageUrl}
                />
                <div className="w-full">
                  <p>{each}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LikeComment = () => {
  const [likeCount, setLikeCount] = useState(0);
  const user = useSelector((state: any) => state?.user);
  const [clicked, setClicked] = useState(comments?.length);
  return (
    <div>
      <div className="flex items-center justify-end py-3">
        <div
          onClick={() => setLikeCount(likeCount + 1)}
          className="flex cursor-pointer items-center justify-around rounded-[20px] border border-[#fff] p-[1%] px-[3%]"
        >
          <ThumbSvg
            fill={!!likeCount ? "blue" : "#fff"}
            className="mr-[10px]"
          />
          {likeCount}
        </div>
      </div>
      <div className="flex justify-center">
        <UserAvatar src={user?.imageUrl} className="mr-2" />
        <div className="flex w-full flex-col">
          <input
            type="text"
            placeholder="Add a comment..."
            className="border-b border-[#fff] outline-none"
          />
          <div className="relative flex items-center justify-between py-2">
            <div className="">
              <EmojiPicker
                onChange={() => {}}
                // onChange={(emoji: string) =>
                //   field.onChange(`${field.value} ${emoji}`)
                // }
              />
            </div>
            <button className="cursor-pointer rounded-[20px] border border-[#fff] p-[1%] px-[2%]">
              Comment
            </button>
          </div>
          <div>
            {comments?.map((each, index) => (
              <Reply
                key={index}
                index={index}
                each={each}
                clicked={clicked}
                setClicked={setClicked}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LikeComment;
