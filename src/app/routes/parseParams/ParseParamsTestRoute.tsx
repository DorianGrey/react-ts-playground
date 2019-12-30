import React, { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import { RouteComponentProps } from "react-router";

const expectedQueryParams = ["bla"];

export const ParseParamsTestRoute: FunctionComponent<RouteComponentProps<
  string | number
>> = ({ location: { search }, match: { params } }) => {
  // Note: This might require a URLSearchParams polyfill, like https://github.com/jerrybendy/url-search-params-polyfill.
  const searchParams = new URLSearchParams(search);
  return (
    <div>
      <p>
        <FormattedMessage id="parseParams.url" />
      </p>
      <p>{JSON.stringify(params)}</p>
      <hr />
      <p>
        <FormattedMessage id="parseParams.search" />
      </p>
      <ul>
        {expectedQueryParams.map(entry => (
          <li key={entry}>
            {entry} {"=>"} {searchParams.get(entry)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ParseParamsTestRoute;
