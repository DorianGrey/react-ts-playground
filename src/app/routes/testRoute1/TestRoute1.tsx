import React, { FunctionComponent } from "react";
import { FormattedMessage } from "react-intl";
import { createStyles, makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import logo from "../../../importedAssets/logo.svg";

const useStyles = makeStyles(() =>
  createStyles({
    AppHeader: {
      padding: "20px",
      textAlign: "center"
    },
    AppTitle: {
      fontSize: "1.5em"
    },
    "@keyframes AppLogoSpin": {
      from: {
        transform: "rotate(0deg)"
      },
      to: {
        transform: "rotate(360deg)"
      }
    },
    AppLogo: {
      animation: "$AppLogoSpin infinite 20s linear",
      height: "80px"
    }
  })
);

export const TestRoute1: FunctionComponent = () => {
  const classes = useStyles();
  return (
    <>
      <Typography variant="h4">TestRoute 1</Typography>
      <Card className={classes.AppHeader}>
        <CardContent>
          <Typography variant="h5">
            <FormattedMessage id="testRoute1.headline" />
          </Typography>
        </CardContent>
        <CardMedia>
          <img src={logo} className={classes.AppLogo} alt="logo" />
        </CardMedia>
      </Card>
    </>
  );
};

export default TestRoute1;
