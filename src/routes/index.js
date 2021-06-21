import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Pages
import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";

function Routes() {
  return (
    <Switch>
      <Route path="/cadastro-marca">
        <MarcaRegister />
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
