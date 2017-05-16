import * as React from "react";
import {ReactNode} from "react";

let permissionCallback: Promise<string> | null;

function requestNotificationPermission(): void {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    permissionCallback = Promise.reject<string>("unavailable");
  } else if (window["Notification"].permission !== "denied") {
    // Otherwise, we need to ask the user for permission
    permissionCallback = Notification.requestPermission();
  }

  // Finally, if the user has denied notifications and you
  // want to be respectful there is no need to bother them any more.
}

export function sendNotification(title: string, options?: NotificationOptions, autodisposeAfter?: number): Promise<Notification> {
  if (!permissionCallback) {
    return Promise.reject<Notification>("not initialized");
  } else {
    // TODO: Fallback on rejection or not available!
    return permissionCallback.then(() => {
      let notification = new Notification(title, options);
      if (autodisposeAfter && autodisposeAfter > 0) {
        setTimeout(() => notification.close(), autodisposeAfter);
      }
      return notification;
    });
  }
}

export default function NotificationProvider(props: Readonly<{ children?: ReactNode }>) {
  requestNotificationPermission();

  return React.Children.only(props.children);
}