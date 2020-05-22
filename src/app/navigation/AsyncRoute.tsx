import React, { FC, Suspense, lazy, ComponentType } from "react";
import { LoadingIndicator } from "../Loading";
import { ErrorBoundary } from "../util/ErrorBoundary";

// Disabling the linter here is OK for now, since the type used
// aligns directly with the one used for `lazy`.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface AsyncRouteProps<T extends ComponentType<any> = ComponentType<any>> {
  loader: () => Promise<{ default: T }>;
}

export const AsyncRoute: FC<AsyncRouteProps> = ({ loader }) => {
  const LazyRoute = lazy(loader);
  return (
    <ErrorBoundary fallback={<div>Error loading component.</div>}>
      <Suspense fallback={<LoadingIndicator />}>
        <LazyRoute />
      </Suspense>
    </ErrorBoundary>
  );
};
