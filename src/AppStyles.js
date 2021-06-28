import { makeStyles } from "@material-ui/core";
import blue from "@material-ui/core/colors/blue";
import { ptBR } from "@material-ui/core/locale";
import { createMuiTheme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "green",
    flexDirection: "column",
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  content: {
    paddingTop: 100,
    paddingBottom: 20,
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    display: "flex",
    overflow: "auto",
  },
  mainComponents: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
}));

const muiTheme = createMuiTheme(
  {
    palette: {
      primary: {
        main: blue[900],
      },
    },
  },
  ptBR
);

export { useStyles, muiTheme };
