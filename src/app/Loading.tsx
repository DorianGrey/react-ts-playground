import * as React from "react";

import {LoadingComponentProps} from "react-loadable";


export default function Loading<T extends LoadingComponentProps>({isLoading, error, pastDelay}: T) {
  if (isLoading) {
    return pastDelay ?
      <div id="loader">
        <div id="box"/>
        <div id="hill"/>
      </div>
      : null;
  } else if (error) {
    return <div>Error loading component.</div>
  } else {
    return null;
  }
}