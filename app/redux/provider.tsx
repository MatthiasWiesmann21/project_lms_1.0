"use client";

import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { useAuth } from "@clerk/nextjs";
import { useEffect } from "react";
import axios from "axios";

const PG = ({ children }: any) => {
  const dispatch = useDispatch();
  const authUser = useAuth();

  const persistedUser = useSelector((state: any) => state?.user);
  const getUser = async () => {
    if (authUser?.userId && persistedUser?.userId !== authUser?.userId) {
      const user = await axios?.get("/api/user");
      dispatch({ type: "SetUser", payload: user?.data });
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return <PersistGate persistor={persistor}>{children}</PersistGate>;
};

export const Providers = ({ children }: any) => (
  <Provider store={store}>
    <PG>{children}</PG>
  </Provider>
);
