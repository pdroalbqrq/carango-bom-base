import React from "react";

// Libs
import {
  Container,
  CssBaseline,
  useMediaQuery,
  useTheme,
} from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

// Routes
import Routes from "./routes";

// Components
import DrawerMenu from "./components/DrawerMenu";
import SideMenu from "./components/SideMenu";

// Styles
import { useStyles, muiTheme } from "./AppStyles";

function App() {
  const classes = useStyles();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down(960));

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        {isMatch ? <DrawerMenu /> : null}
        <main className={classes.content}>
          <Container className={classes.mainComponents}>
            {isMatch ? null : <SideMenu />}
            <Container component="article" maxWidth="md">
              <Routes />
            </Container>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
