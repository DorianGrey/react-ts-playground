export type NotificationPermissionState =
  | NotificationPermission
  | "unavailable"
  | "pending";

export function requestNotificationPermission(): Promise<
  NotificationPermissionState
> {
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

function createTimeoutPromise(timeout = 3000) {
  return new Promise<unknown>((_resolve, reject) => {
    setTimeout(() => reject(new Error("timeout")), timeout);
  });
}

export function sendNotification(
  title: string,
  options?: NotificationOptions,
  autodisposeAfter?: number
): Promise<Notification> {
  // Note: The permission request might take a while, so it is possible to get out of sync with it.
  // We'll be waiting for approx. 3 seconds before cancelling the sent notification to avoid user confusion.
  return Promise.race([
    requestNotificationPermission(),
    createTimeoutPromise(),
  ]).then((permissionState) => {
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
  });
}
