import React, { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import FontIcon from "react-md/lib/FontIcons/FontIcon";
import ListItem from "react-md/lib/Lists/ListItem";
// import {match} from "react-router";
import { Link as RouterLink, Route } from "react-router-dom";

// <FormattedMessage id={p.label}/>

interface NaviLinkProps {
  label: string;
  to: string;
  exact?: boolean;
  icon: string;
}

// const localizedLink = (props: any) => <RouterLink {...props}/>;

function isActive(url: string, pathname: string): boolean {
  return url.indexOf(pathname) >= 0;
}

const NaviLink: FunctionComponent<NaviLinkProps> = ({
  label,
  to,
  exact,
  icon
}) => {
  return (
    <Route path={to} exact={exact}>
      {({ location }) => {
        const match = isActive(to, location.pathname);

        return (
          <ListItem
            component={RouterLink}
            active={match}
            to={to}
            primaryText={<FormattedMessage id={label} />}
            leftIcon={icon ? <FontIcon>{icon}</FontIcon> : undefined}
          />
        );
      }}
    </Route>
  );
};

export default NaviLink;
