declare module "linkstate" {
  export default function linkstate<T>(
    component: React.Component<any, any>,
    key: string,
    eventPath?: string
  ): (e: React.SyntheticEvent<T>) => void;
}
