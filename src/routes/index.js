import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Pages
import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";
import Usuario from "../pages/Usuario/index";
import UsuarioRegister from "../pages/Usuario/register";

import Veiculo from "../pages/Veiculo";
import VeiculoRegister from "../pages/Veiculo/register";

function Routes() {
  return (
    <Switch>
<<<<<<< Updated upstream
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
=======
      {/* Veículos */}
      <Route exact path="/" component={Veiculo} />
      <Route exact path="/veiculo/cadastro" component={VeiculoRegister} />
      <Route exact path="/veiculo/edicao/:id" component={VeiculoRegister} />
      {/* Marcas */}
      <Route exact path="/marcas" component={Marca} />
      <Route exact path="/marca/cadastro" component={MarcaRegister} />
      <Route exact path="/marca/edicao/:id" component={MarcaRegister} />
>>>>>>> Stashed changes
    </Switch>
  );
}

export default Routes;
