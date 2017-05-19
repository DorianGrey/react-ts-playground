import * as React from "react";
import {RouteComponentProps} from "react-router";
import {FormattedMessage} from "react-intl";

const expectedQueryParams = ["bla"];

export default (props: any & RouteComponentProps<string | number>) => {
  // Note: This might require a URLSearchParams polyfill, like https://github.com/jerrybendy/url-search-params-polyfill.
  const searchParams = new URLSearchParams(props.location.search);
  const params       = props.match.params;
  return (
    <div>
      <p><FormattedMessage id="parseParams.url"/></p>
      <p>{JSON.stringify(params)}</p>
      <hr />
      <p><FormattedMessage id="parseParams.search"/></p>
      <ul>
        {
          expectedQueryParams.map(entry => <li key={entry}>{entry} => {searchParams.get(entry)}</li>)
        }
      </ul>
    </div>
  );
};