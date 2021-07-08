import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Pages
import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";

import Veiculo from "../pages/Veiculo";
import VeiculoRegister from "../pages/Veiculo/register";

function Routes() {
  return (
    <Switch>
      {/* Veículos */}
      <Route exact path="/" component={Veiculo} />
      <Route exact path="/veiculo/cadastro" component={VeiculoRegister} />
      <Route exact path="/veiculo/edicao/:id" component={VeiculoRegister} />
      {/* Marcas */}
      <Route exact path="/marcas" component={Marca} />
      <Route exact path="/marca/cadastro" component={MarcaRegister} />
      <Route exact path="/marca/edicao/:id" component={MarcaRegister} />
    </Switch>
  );
}

export default Routes;
