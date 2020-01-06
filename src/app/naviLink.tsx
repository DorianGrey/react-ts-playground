import React, {
  FunctionComponent,
  ComponentType,
  useMemo,
  forwardRef
} from "react";
import { useIntl } from "react-intl";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
  useLocation
} from "react-router-dom";

interface NaviLinkProps {
  label: string;
  to: string;
  icon: ComponentType<any>;
}

function isActive(url: string, pathname: string): boolean {
  return url.indexOf(pathname) >= 0;
}

const NaviLink: FunctionComponent<NaviLinkProps> = ({
  label,
  to,
  icon: Icon
}) => {
  const { formatMessage } = useIntl();
  const { pathname } = useLocation();

  const renderLink = useMemo(
    () =>
      // eslint-disable-next-line react/display-name
      forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <ListItem button component={renderLink} selected={isActive(to, pathname)}>
      <ListItemIcon>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={formatMessage({ id: label })} />
    </ListItem>
  );
};

export default NaviLink;
