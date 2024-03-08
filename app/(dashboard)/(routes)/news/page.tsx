"use client";
import { useEffect, useState } from "react";
import { PostList } from "./_components/post-list";
import axios from "axios";

const NewsPage = () => {
  const [posts, setPosts] = useState([]);
  const getPosts = async () => {
    const response = await axios?.get(`/api/posts`);
    setPosts(response?.data?.data);
  };
  useEffect(() => {
    getPosts();
  }, []);
  return (
    <div className="space-y-4 p-6 dark:bg-[#313338]">
      <PostList
        //@ts-ignore
        items={posts}
        getPosts={getPosts}
      />
    </div>
  );
};

export default NewsPage;
