import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Pages
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";

import Veiculo from "../pages/Veiculo";
import VeiculoRegister from "../pages/Veiculo/register";

import Usuario from "../pages/Usuario";
import UsuarioRegister from "../pages/Usuario/register";

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
      {/* Login */}
      <Route exact path="/login" component={Login} />
      {/* Cadastro */}
      <Route exact path="/cadastro" component={Cadastro} />
      {/* Usuarios */}
      <Route exact path="/usuarios" component={Usuario} />
      <Route exact path="/usuario/cadastro" component={UsuarioRegister} />
      <Route exact path="/usuario/edicao/:id" component={UsuarioRegister} />
    </Switch>
  );
}

export default Routes;
