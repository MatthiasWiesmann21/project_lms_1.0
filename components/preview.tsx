"use client";

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

  return (
    <div className="mt-5 pt-4" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
      <span className="ml-4 text-[18px] font-bold">About Course</span>
      <span className="text-gray-500">
        <ReactQuill theme="bubble" value={value} readOnly />
      </span>
    </div>
  );
};
