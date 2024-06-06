"use client";

import { useLanguage } from "@/lib/check-language";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );
  const currentLanguage = useLanguage();

  return (
    <div className="mt-5 pt-4 rounded-lg" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
      <span className="ml-4 text-[18px] font-bold">{currentLanguage.chapter_aboutcourse_title}</span>
      <span className="text-gray-500">
        <ReactQuill theme="bubble" value={value} readOnly />
      </span>
    </div>
  );
};
