import React, { FC, useCallback } from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import Switch from "@material-ui/core/Switch";
import LightIcon from "@material-ui/icons/Brightness1Outlined";
import DarkIcon from "@material-ui/icons/Brightness3Outlined";

import { useThemeContext } from "../theme";

const useStyles = makeStyles(() =>
  createStyles({
    gridItem: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
  })
);

export const ThemePicker: FC = () => {
  const classes = useStyles();
  const { currentTheme, setLightTheme, setDarkTheme } = useThemeContext();

  const handleChange = useCallback(
    (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
      if (checked) {
        setLightTheme();
      } else {
        setDarkTheme();
      }
    },
    [setDarkTheme, setLightTheme]
  );

  return (
    <Typography component="div">
      <Grid
        component="label"
        container
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item className={classes.gridItem}>
          <DarkIcon />
        </Grid>
        <Grid item>
          <Switch checked={currentTheme === "light"} onChange={handleChange} />
        </Grid>
        <Grid item className={classes.gridItem}>
          <LightIcon />
        </Grid>
      </Grid>
    </Typography>
  );
};
