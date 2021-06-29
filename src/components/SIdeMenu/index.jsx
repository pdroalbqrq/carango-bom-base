import React from "react";

// Libs
import { Container } from "@material-ui/core";

// Components
import ItensMenu from "../ItensMenu";

// Style
import { useStyles } from "./styles";

function SideMenu() {
  const classes = useStyles();

  return (
    <Container disableGutters className={classes.main}>
      <ItensMenu />
    </Container>
  );
}

export default SideMenu;
