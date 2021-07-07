import React, { useEffect, useState } from "react";

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
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // if (localStorage.getItem("jwt")) {
    //   setIsAuth(true);
    // }
  });

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        {isMatch ? <DrawerMenu auth={{ isAuth, setIsAuth }} /> : null}
        <main className={classes.content}>
          <Container className={classes.mainComponents}>
            {isMatch ? null : <SideMenu auth={{ isAuth, setIsAuth }} />}
            <Container component="article" maxWidth="md">
              <Routes setAuth={setIsAuth} />
            </Container>
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
