"use client";

import { getCurrentPushSubscription, registerPushNotification, unregisterPushNotification } from "@/notifications/pushService";
import { BellOff, BellRing, Users } from "lucide-react";
import { useEffect, useState } from "react";

interface MenubarProps {
  onUserMenuClick: () => void;
}

export default function Menubar({ onUserMenuClick }: MenubarProps) {
  return (
    <div className="flex items-center justify-between gap-3 border-e bg-white p-3">
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

  useEffect(() => {
    async function getActivePushSubscription() {
      const subscription = await getCurrentPushSubscription();
      setHasActivePushSubscription(!!subscription);
    }
    getActivePushSubscription();
  }, []);

  async function setPushNotificationEnabled(enabled: boolean) {
    try {
      if (enabled) {
        await registerPushNotification();
      } else {
        await unregisterPushNotification();
      }
      setHasActivePushSubscription(enabled);
    } catch (error) {
      console.log(error);
      if (enabled && Notification.permission === "denied") {
        alert("Please enable push notifications in your browser settings");
      } else {
        alert("Something went wrong, please try again later");
      }
    }
  }

  if (hasActivePushSubscription === undefined) return null;

  return (
    <div>
      {hasActivePushSubscription ? (
        <span title="Disable push notifications on this device">
          <BellOff
            onClick={() => setPushNotificationEnabled(false)}
            className="cursor-pointer"
          />
        </span>
      ) : (
        <span title="Enable push notifications on this device">
          <BellRing
            onClick={() => setPushNotificationEnabled(true)}
            className="cursor-pointer"
          />
        </span>
      )}
    </div>
  );
}
