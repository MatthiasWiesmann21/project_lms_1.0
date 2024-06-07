"use client";

import dynamic from "next/dynamic";
import { useMemo } from "react";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const PostPreview = ({ value }: PreviewProps) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  return (
    <div className="mt-4 pt-1 rounded-lg" style={{ background: "rgba(0, 0, 0, 0.3)" }}>
      <span className="text-white dark:text-gray-300">
        <ReactQuill theme="bubble" value={value} readOnly />
      </span>
    </div>
  );
};
