import React, { FC } from "react";
import { FormattedMessage } from "react-intl";
import { useHistory, useRouteMatch } from "react-router";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";

const expectedQueryParams = ["bla"];

export const ParseParamsTestRoute: FC = () => {
  const {
    location: { search },
  } = useHistory();
  const { params } = useRouteMatch();
  // Note: This might require a URLSearchParams polyfill, like https://github.com/jerrybendy/url-search-params-polyfill.
  const searchParams = new URLSearchParams(search);
  return (
    <div>
      <p>
        <FormattedMessage id="parseParams.url" />
      </p>
      <p>{JSON.stringify(params)}</p>
      <Divider />
      <p>
        <FormattedMessage id="parseParams.search" />
      </p>
      <List>
        {expectedQueryParams.map((entry) => (
          <ListItem key={entry}>
            {">"} {entry} {"=>"} {searchParams.get(entry)}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default ParseParamsTestRoute;
