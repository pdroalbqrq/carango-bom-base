import React from "react";

// Libs
import { Container } from "@material-ui/core";

// Components
import ItensMenu from "../ItensMenu";

// Style
import { useStyles } from "./styles";

function SideMenu({ auth }) {
  const classes = useStyles();

  return (
    <Container
      disableGutters
      className={classes.main}
      data-testid="sideMenu-container"
    >
      <ItensMenu auth={auth} />
    </Container>
  );
}

export default SideMenu;
