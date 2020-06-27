import React, { FunctionComponent } from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";

import { Routes } from "./Routes";
import { NavigationDrawer } from "./NavigationDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Little override stuff to provide more likely defaults.
    "@global": {
      body: {
        fontFamily: [
          "Roboto",
          /* Safari for OS X and iOS (San Francisco) */
          "-apple-system",
          /* Chrome >= 56 for OS X (San Francisco), Windows, Linux and Android */
          "system-ui",
          /* Chrome < 56 for OS X (San Francisco) */
          "BlinkMacSystemFont",
          /* Windows */
          "Segoe UI",
          /* KDE */
          "Oxygen",
          /* Ubuntu */
          "Ubuntu",
          /* Gnome */
          "Cantarell",
          /* FF OS */
          "Fira Sans",
          /* Older android versions */
          "Droid Sans",
          /* Basic web fallback */
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ].join(","),
      },
    },
    root: {
      display: "flex",
    },
    toolbar: {
      ...theme.mixins.toolbar,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  })
);

const Navigation: FunctionComponent = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Nav drawer */}
      <NavigationDrawer />

      {/* Content */}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Routes />
      </main>
    </div>
  );
};

export default Navigation;
