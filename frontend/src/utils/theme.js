import { grey, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#071952",
      light: "#b30394",
    },
    secondary: {
      main: "#42a5f5",
    },
    cardBackground: {
      neutral: "#ffdcb9",
    },
    grey: {
      main: grey.A200,
    },
    error: {
      main: red[400],
    },
  },
  typography: {
    fontFamily: [
      "Proxima Nova",
      "Roboto",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
  },
});
