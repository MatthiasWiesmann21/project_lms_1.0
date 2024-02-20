"use client";

import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store";
import { useEffect, useState } from "react";

export const Providers = ({ children }: any) => {
  const [mount, setMount] = useState(false);
  useEffect(() => setMount(true), []);
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>{children}</PersistGate>
    </Provider>
  );
};
