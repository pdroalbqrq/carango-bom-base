import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Pages
import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";
import Usuario from "../pages/Usuario/index";
import UsuarioRegister from "../pages/Usuario/register";

function Routes() {
  return (
    <Switch>
      <Route path="/cadastro-marca">
        <MarcaRegister />
      </Route>
      <Route path="/entrar">
        <Usuario />
      </Route>
      <Route path="/cadastro-usuario">
        <UsuarioRegister />
      </Route>
      <Route path="/alteracao-marca/:id">
        <MarcaRegister />
      </Route>
      <Route path="/">
        <Marca />
      </Route>
    </Switch>
  );
}

export default Routes;
