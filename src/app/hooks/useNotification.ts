import { useEffect, useState } from "react";

type NotificationPermissionState =
  | NotificationPermission
  | "unavailable"
  | "pending";

function requestNotificationPermission(): Promise<NotificationPermissionState> {
  // If the browser supports notifications AND the user has not already
  // rejected our request, we will ask for it. Otherwise, we will switch
  // to "unavailable" in case the feature is absent, or the previous
  // state otherwise.
  if (!("Notification" in window)) {
    return Promise.resolve("unavailable");
  }
  if (Notification.permission !== "denied") {
    // Otherwise, we need to ask the user for permission
    return Notification.requestPermission();
  }
  return Promise.resolve(Notification.permission);
}

type UseNotification = [
  NotificationPermissionState,
  (
    title: string,
    options?: NotificationOptions,
    autodisposeAfter?: number
  ) => Promise<Notification>
];
export const useNotification = (): UseNotification => {
  const [permissionState, setPermissionState] = useState<
    NotificationPermissionState
  >("pending");

  useEffect(() => {
    // TODO: We need to handle the case that the permission
    // gets revoked after this initial request, but before
    // any notifiction was sent - the request might NOT yet
    // have received a reply.
    requestNotificationPermission().then(setPermissionState, () =>
      setPermissionState("unavailable")
    );
  }, []);

  const sendNotification = (
    title: string,
    options?: NotificationOptions,
    autodisposeAfter?: number
  ): Promise<Notification> => {
    if (permissionState === "granted") {
      const notification = new Notification(title, options);
      if (autodisposeAfter && autodisposeAfter > 0) {
        setTimeout(() => notification.close(), autodisposeAfter);
      }
      return Promise.resolve(notification);
    } else {
      return Promise.reject<Notification>(
        `Invalid permission state=${permissionState}`
      );
    }
  };

  return [permissionState, sendNotification];
};
