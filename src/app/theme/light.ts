import { createMuiTheme } from "@material-ui/core/styles";
import { PaletteOptions } from "@material-ui/core/styles/createPalette";

const palette: PaletteOptions = {
  type: "light",
  primary: { main: "#00ACC1" },
  secondary: { main: "#FFB300" },
};

export default createMuiTheme({ palette });
