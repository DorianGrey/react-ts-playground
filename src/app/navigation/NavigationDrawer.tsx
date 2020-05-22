import React, { FC, useState } from "react";
import { useIntl } from "react-intl";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Hidden from "@material-ui/core/Hidden";
import Drawer from "@material-ui/core/Drawer";
import { useTheme } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
// Icons for the navigation
import PermContactCalendarIcon from "@material-ui/icons/PermContactCalendar";
import AssignmentIcon from "@material-ui/icons/Assignment";
import QuestionAnswerIcon from "@material-ui/icons/QuestionAnswer";

import CurrentTime from "../currentTime/CurrentTime";
import LanguagePicker from "../language-picker/LanguagePicker";
import NaviLink from "../naviLink";
import { ThemePicker } from "./ThemePicker";

const navItems = [
  {
    label: "nav.testRoute1",
    to: "/tr0",
    icon: PermContactCalendarIcon,
  },
  {
    label: "nav.todos",
    to: "/todo-list",
    icon: AssignmentIcon,
  },
  {
    label: "nav.testRoute3",
    to: "/lazy-test/faq?bla=true",
    icon: QuestionAnswerIcon,
  },
];

const navigationItems = navItems.map((p) => <NaviLink {...p} key={p.to} />);
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      [theme.breakpoints.up("sm")]: {
        width: drawerWidth,
        flexShrink: 0,
      },
    },
    drawerItem: {
      width: "100%",
      display: "flex",
      justifyContent: "center",
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    appBar: {
      [theme.breakpoints.up("sm")]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    },
    menuButton: {
      marginRight: theme.spacing(2),
      [theme.breakpoints.up("sm")]: {
        display: "none",
      },
    },
    drawerPaper: {
      width: drawerWidth,
    },
  })
);

export const NavigationDrawer: FC = () => {
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { formatMessage } = useIntl();
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  const drawerContent = (
    <List>
      <ListItem className={classes.drawerItem}>
        <LanguagePicker />
      </ListItem>
      <Divider />
      {navigationItems}
      <Divider />
      <ListItem className={classes.drawerItem}>
        <ThemePicker />
      </ListItem>
      <Divider />
      <ListItem className={classes.drawerItem}>
        <CurrentTime />
      </ListItem>
    </List>
  );

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {formatMessage({ id: "header.title" })}
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="navigation">
        {/* Responsive sidenav */}
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawerContent}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawerContent}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
};
