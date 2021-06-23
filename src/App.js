import React from "react";

// Libs
import { Container, CssBaseline } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/core/styles";

// Routes
import Routes from "./routes";

// Styles
import { useStyles, muiTheme } from "./AppStyles";

function App() {
  const classes = useStyles();

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Container component="article" maxWidth="md">
            <Routes />
          </Container>
        </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
