"use client";

import {
  Deutch,
  English,
  Espanol,
  Francaise,
  Italiano,
  Portugues,
  Mandarin,
  Russian,
} from "../lib/localization";

// import { useSelector } from "react-redux";

// const useUserRole = () => useSelector((state: any) => state?.user);

const currentLanguage = "Italiano";

export const useLanguage = () => {
  return currentLanguage === "Italiano" ? Italiano : Russian;
};
