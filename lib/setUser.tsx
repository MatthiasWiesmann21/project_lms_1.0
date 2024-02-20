"use client";

import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const SetUser = () => {
  const dispatch = useDispatch();
  const authUser = useAuth();

  const persistedUser = useSelector((state: any) => state?.user);
  const getUser = async () => {
    if (persistedUser?.userId !== authUser?.userId) {
      const user = await axios?.get("/api/user");
      dispatch({ type: "SetUser", payload: user?.data });
    }
  };
  useEffect(() => {
    getUser();
  }, []);
  return <></>;
};

export default SetUser;
