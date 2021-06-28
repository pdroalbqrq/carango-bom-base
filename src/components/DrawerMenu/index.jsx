import React, { useState } from "react";

// Libs
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory } from "react-router";

// Style
import { useStyles } from "./styles";

function DrawerMenu() {
  const classes = useStyles();
  const history = useHistory();

  const [isShowingDrawer, setIsShowingDrawer] = useState(false);

  const handlePageNavigation = (path) => {
    setIsShowingDrawer(false);
    history.push(path);
  };

  return (
    <AppBar className={classes.appBar}>
      {isShowingDrawer ? (
        <Drawer
          open={isShowingDrawer}
          onClose={() => setIsShowingDrawer(false)}
        >
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
        </Drawer>
      ) : null}

      <Toolbar>
        <IconButton
          onClick={() => setIsShowingDrawer(!isShowingDrawer)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default DrawerMenu;
