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

import Dashboard from "../pages/DashBoard";

function Routes({ setAuth }) {
  return (
    <Switch>
      {/* Login */}
      <Route exact path="/login" render={() => <Login setAuth={setAuth} />} />
      {/* Cadastro */}
      <Route exact path="/cadastro" component={Cadastro} />
      {/* Veículos */}
      <Route exact path="/" component={Veiculo} />
      <Route exact path="/veiculos/cadastro" component={VeiculoRegister} />
      <Route exact path="/veiculos/edicao/:id" component={VeiculoRegister} />
      {/* Marcas */}
      <Route exact path="/marcas" component={Marca} />
      <Route exact path="/marcas/cadastro" component={MarcaRegister} />
      <Route exact path="/marcas/edicao/:id" component={MarcaRegister} />
      {/* Usuarios */}
      <Route exact path="/usuarios" component={Usuario} />
      <Route exact path="/usuarios/cadastro" component={UsuarioRegister} />
      <Route exact path="/usuarios/edicao/:id" component={UsuarioRegister} />
      {/* DashBoard */}
      <Route exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default Routes;
