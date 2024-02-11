"use client";

import { useState } from "react";
import toast from "react-hot-toast";

interface ContainerIdProps {
  initialData: {
    id: string;
  };
};

export const ShowContainerId = ({ initialData }: ContainerIdProps) => {
  const [isBlurred, setIsBlurred] = useState(true); // State to manage blur effect

  // Function to toggle blur effect
  const handleToggleBlur = () => {
    setIsBlurred(!isBlurred);
  };

  // Function to copy container ID to clipboard
  const handleCopyId = async () => {
    try {
      await navigator.clipboard.writeText(initialData.id);
      toast.success("ID copied to clipboard!");
    } catch (error) {
      console.error("Failed to copy ID", error);
      toast.error("Failed to copy ID");
    }
  };

  return (
    <div className="mt-6 border bg-slate-200 dark:bg-slate-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Container Id   
      </div>
      <p className={`text-sm mt-2 ${isBlurred ? "blur-sm" : ""}`}>
        {initialData.id}
      </p>
      <div>
          <button
            className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleToggleBlur}
          >
            {isBlurred ? "Show ID" : "Hide ID"}
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            onClick={handleCopyId}
          >
            Copy ID
          </button>
        </div>
    </div>
  );
};
