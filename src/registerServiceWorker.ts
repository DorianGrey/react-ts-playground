import { register } from "register-service-worker";

export default function registerServiceWorker() {
  if (process.env.NODE_ENV === "production") {
    register("/service-worker.js", {
      ready(_registration: ServiceWorkerRegistration) {
        console.log("Service worker is active.");
      },
      registered(_registration: ServiceWorkerRegistration) {
        console.log("Service worker has been registered.");
      },
      cached(_registration: ServiceWorkerRegistration) {
        console.log("Content has been cached for offline use.");
      },
      updatefound(_registration: ServiceWorkerRegistration) {
        console.log("New content is downloading.");
      },
      updated(_registration: ServiceWorkerRegistration) {
        console.log("New content is available; please refresh.");
      },
      offline() {
        console.log(
          "No internet connection found. App is running in offline mode."
        );
      },
      error(error: Error) {
        console.error("Error during service worker registration:", error);
      }
    });
  }
}
