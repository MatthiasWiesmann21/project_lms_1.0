"use client";

import { getCurrentPushSubscription, registerPushNotification, unregisterPushNotification } from "@/notifications/pushService";
import { BellOff, BellRing, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { LoadingIndicator } from "stream-chat-react";
import DisappearingMessage from "./DisappearingMessage";

interface MenubarProps {
  onUserMenuClick: () => void;
}

export default function Menubar({ onUserMenuClick }: MenubarProps) {
  return (
    <div className="flex items-center justify-start border-e bg-white py-3">
      <div className="flex gap-6">
        <PushSubscriptionToggleButton />
        <span title="Show users">
          <Users className="cursor-pointer" onClick={onUserMenuClick} />
        </span>
      </div>
    </div>
  );
}

function PushSubscriptionToggleButton() {
  const [hasActivePushSubscription, setHasActivePushSubscription] =
    useState<boolean>(false);

    const [loading, setLoading] = useState(false);

    const [confirmationMessage, setConfirmationMessage] = useState<string>();

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  async function setPushNotificationEnabled(enabled: boolean) {
    if (loading) return;
    setLoading(true);
    setConfirmationMessage(undefined);

    try {
      if (enabled) {
        await registerPushNotification();
      } else {
        await unregisterPushNotification();
      }
      setConfirmationMessage("Push notifications " + [enabled ? "enabled" : "disabled"])
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.log(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong, please try again later");
      }
    } finally {
      setLoading(false);
    }
  }

  if (hasActivePushSubscription === undefined) return null;

  return (
    <div className="relative">
      {loading && (
        <span className="absolute right-1/2 z-10 -translate-x-1/2 -translate-y-1/2 py-2">
          <LoadingIndicator />
        </span>
      )}
      {confirmationMessage && (
        <DisappearingMessage classname="absolute right-1/2 top-8 z-10 -translate-x-1/2 rounded-lg bg-white px-2 py-1 shadow-md">
          {confirmationMessage}
        </DisappearingMessage>
      )}
      {/* {hasActivePushSubscription ? (
        <span title="Disable push notifications on this device">
          <BellOff
            onClick={() => setPushNotificationEnabled(false)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <BellRing
            onClick={() => setPushNotificationEnabled(true)}
            className={`cursor-pointer ${loading ? "opacity-10" : ""}`}
          />
        </span>
      )} */}
    </div>
  );
}
