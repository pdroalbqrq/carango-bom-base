import React from "react";

// Libs
import {
  Container,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import { useHistory } from "react-router";

// Style
import { useStyles } from "./styles";

function SideMenu() {
  const classes = useStyles();
  const history = useHistory();

  return (
    <Container disableGutters className={classes.main}>
      <List className={classes.listContainer}>
        <ListItem button onClick={() => history.push("/login")}>
          <ListItemText primary={"Entrar"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push("/")}>
          <ListItemText primary={"Veículos"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push("/marcas")}>
          <ListItemText primary={"Marcas"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push("/usuarios")}>
          <ListItemText primary={"Usuários"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push("/dashboard")}>
          <ListItemText primary={"Dashboard"} />
        </ListItem>
        <Divider />
        <ListItem button onClick={() => history.push("/login")}>
          <ListItemText primary={"Sair"} />
        </ListItem>
        <Divider />
      </List>
    </Container>
  );
}

export default SideMenu;
