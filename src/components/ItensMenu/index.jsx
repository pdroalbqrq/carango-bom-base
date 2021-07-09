import React from "react";

// Libs
import { Divider, List, ListItem, ListItemText } from "@material-ui/core";
import { useHistory } from "react-router";
// Style
import { useStyles } from "./styles";

function ItensMenu({ setIsShowingDrawer, auth }) {
  const { isAuth, setIsAuth } = auth;
  const classes = useStyles();
  const history = useHistory();

  const handlePageNavigation = (path) => {
    setIsShowingDrawer && setIsShowingDrawer(false);
    history.push(path);
  };

  if (!isAuth) {
    return (
      <List className={classes.listContainer}>
        <ListItem
          data-testid="entrar-btn"
          button
          onClick={() => handlePageNavigation("/login")}
        >
          <ListItemText primary={"Entrar"} />
        </ListItem>
        <Divider />
        <ListItem
          data-testid="veiculos-btn"
          button
          onClick={() => handlePageNavigation("/")}
        >
          <ListItemText primary={"Veículos"} />
        </ListItem>
        <Divider />
      </List>
    );
  }
  return (
    <List className={classes.listContainer}>
      <ListItem
        data-testid="perfil-btn"
        button
        onClick={() => handlePageNavigation("/usuarios/edicao")}
      >
        <ListItemText primary={"Perfil"} />
      </ListItem>
      <Divider />
      <ListItem
        data-testid="veiculos-btn"
        button
        onClick={() => handlePageNavigation("/")}
      >
        <ListItemText primary={"Veículos"} />
      </ListItem>
      <Divider />

      <ListItem
        data-testid="marcas-btn"
        button
        onClick={() => handlePageNavigation("/marcas")}
      >
        <ListItemText primary={"Marcas"} />
      </ListItem>
      <Divider />
      <ListItem
        data-testid="usuarios-btn"
        button
        onClick={() => handlePageNavigation("/usuarios")}
      >
        <ListItemText primary={"Usuários"} />
      </ListItem>
      <Divider />
      <ListItem
        data-testid="dashboard-btn"
        button
        onClick={() => handlePageNavigation("/dashboard")}
      >
        <ListItemText primary={"Dashboard"} />
      </ListItem>
      <Divider />
      <ListItem
        data-testid="sair-btn"
        button
        onClick={() => {
          setIsAuth(false);
          localStorage.removeItem("jwt");
          handlePageNavigation("/login");
        }}
      >
        <ListItemText primary={"Sair"} />
      </ListItem>
      <Divider />
    </List>
  );
}

export default ItensMenu;
