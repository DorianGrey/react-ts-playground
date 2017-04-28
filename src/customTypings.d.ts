declare module "*.scss" {
  let __scss__: string;
  export default __scss__;
}

interface Process {
  env: {
    NODE_ENV: "production" | "development";
  };
}

declare const ENV: "production" | "development";
declare const process: Process;