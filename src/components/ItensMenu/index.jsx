import React from "react";

// Libs
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";
import { useHistory } from "react-router";

// Style
import { useStyles } from "./styles";

function ItensMenu({ setIsShowingDrawer }) {
  const classes = useStyles();
  const history = useHistory();

  const handlePageNavigation = (path) => {
    setIsShowingDrawer && setIsShowingDrawer(false);
    history.push(path);
  };

  return (
    <List className={classes.listContainer}>
      <ListItem button onClick={() => handlePageNavigation("/login")}>
        <ListItemText primary={"Entrar"} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => handlePageNavigation("/")}>
        <ListItemText primary={"Veículos"} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => handlePageNavigation("/marcas")}>
        <ListItemText primary={"Marcas"} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => handlePageNavigation("/usuarios")}>
        <ListItemText primary={"Usuários"} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => handlePageNavigation("/dashboard")}>
        <ListItemText primary={"Dashboard"} />
      </ListItem>
      <Divider />
      <ListItem button onClick={() => handlePageNavigation("/login")}>
        <ListItemText primary={"Sair"} />
      </ListItem>
      <Divider />
    </List>
  );
}

export default ItensMenu;
