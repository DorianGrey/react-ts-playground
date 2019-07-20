// Inspired by https://github.com/AngularClass/angular2-bootloader, adopted to our
// TypeScript and TsLint configurations.

export function bootloader(main: () => void): void {
  if (document.readyState === "loading") {
    const domReadyHandler = () => {
      document.removeEventListener("DOMContentLoaded", domReadyHandler, false);
      main();
    };
    document.addEventListener("DOMContentLoaded", domReadyHandler, false);
  } else {
    main();
  }
}
