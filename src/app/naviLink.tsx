import * as React from "react";
import { FormattedMessage } from "react-intl";
import FontIcon from "react-md/lib/FontIcons/FontIcon";
import ListItem from "react-md/lib/Lists/ListItem";
import { Link as RouterLink, Route } from "react-router-dom";

// <FormattedMessage id={p.label}/>

interface NaviLinkProps {
  label: string;
  to: string;
  exact?: boolean;
  icon: string;
}

// const localizedLink = (props: any) => <RouterLink {...props}/>;

const NaviLink = (props: NaviLinkProps) => {
  const { label, to, exact, icon } = props;
  return (
    <Route path={to} exact={exact}>
      {({ match }) => {
        let leftIcon;
        if (icon) {
          leftIcon = <FontIcon>{icon}</FontIcon>;
        }

        // TODO: Check match, fix it!

        return (
          <ListItem
            component={RouterLink}
            active={!!match}
            to={to}
            primaryText={<FormattedMessage id={label} />}
            leftIcon={leftIcon}
          />
        );
      }}
    </Route>
  );
};

export default NaviLink;
