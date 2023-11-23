import { getReadyServiceWorker } from "@/utils/serviceWorker";

export async function getCurrentPushSubscription(): Promise<PushSubscription | null> {
    const  sw = await getReadyServiceWorker();
    return sw.pushManager.getSubscription();
}

export async function registerPushNotification() {
    if (!("PushManager" in window)) {
        throw Error("Push notification are not supported by this browser")
    }

    const existingSubscription = await getCurrentPushSubscription();

    if (existingSubscription) {
        throw Error("Existing push subscription found");
    }

    const sw = await getReadyServiceWorker();

    const subscription = await sw.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
    });

    await sendPushSubscriptionToServer(subscription);
}

export async function unregisterPushNotification() {
    const existingSubscription = await getCurrentPushSubscription();

    if (!existingSubscription) {
        throw Error("No existing push subscription found");
    }

    await deletePushSubscriptionFromServer(existingSubscription);

    await existingSubscription.unsubscribe();

}

export async function sendPushSubscriptionToServer(subscription: PushSubscription) {
    console.log("Sending push subscription to server", subscription);
}

export async function deletePushSubscriptionFromServer(subscription: PushSubscription) {
    console.log("Deleting push subscription from server", subscription);
}