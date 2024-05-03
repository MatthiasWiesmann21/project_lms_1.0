"use client";

import { useState } from "react";
import axios from "axios";
import { useLanguage } from "@/lib/check-language";

interface PrivacyPolicyModalProps {
  profile: { id: string; acceptedPrivacyPolicy: boolean } | null;
}

export default function PrivacyPolicyModal({
  profile,
}: PrivacyPolicyModalProps) {
  const [isModalOpen, setIsModalOpen] = useState(
    profile?.acceptedPrivacyPolicy === false
  );
  const currentLanguage = useLanguage();

  const acceptedPrivacyPolicy = async () => {
    const response = await axios.patch(`/api/profile/${profile?.id}`, {
      acceptedPrivacyPolicy: true,
    });

    if (response.status === 200) {
      window.location.reload();
    }
  };

  if (!isModalOpen) return null;

  return (
    <div className="fixed w-full h-full inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50 backdrop-filter backdrop-blur-sm"></div>
      <div className="relative z-10 bg-white p-4 sm:m-20 md:m-32 lg:m-32 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-black mb-2">
          {currentLanguage.privacy_policy_title}
        </h2>
        <p className="text-black">
          {currentLanguage.privacy_policy_description}
        </p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex space-x-4 mt-4">
            <a href="https://google.com" target="_blank" className="text-blue-500">
              Privacy Policy
            </a>
            <a href="https://google.com" target="_blank" className="text-blue-500">
              Terms of Service
            </a>
          </div>
          <button
            className="ml-auto mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
            onClick={acceptedPrivacyPolicy}
          >
            {currentLanguage.privacy_policy_button}
          </button>
        </div>
      </div>
    </div>
  );
}
