import React from "react";

// Libs
import { Route, Switch } from "react-router-dom";

// Components
import PrivateRoute from "../components/PrivateRoute";

// Pages
import Login from "../pages/Login";
import Cadastro from "../pages/Cadastro";

import Marca from "../pages/Marca";
import MarcaRegister from "../pages/Marca/register";

import Veiculo from "../pages/Veiculo";
import VeiculoRegister from "../pages/Veiculo/register";

import Usuario from "../pages/Usuario";
import UsuarioRegister from "../pages/Usuario/register";

import Perfil from "../pages/Perfil";

import Dashboard from "../pages/Dashboard";

function Routes({ setAuth }) {
  return (
    <Switch>
      {/* Login */}
      <Route exact path="/login" render={() => <Login setAuth={setAuth} />} />
      {/* Cadastro */}
      <Route exact path="/cadastro" component={Cadastro} />
      {/* Veículos */}
      <Route exact path="/" component={Veiculo} />
      <PrivateRoute
        exact
        path="/veiculos/cadastro"
        component={VeiculoRegister}
      />
      <PrivateRoute
        exact
        path="/veiculos/edicao/:id"
        component={VeiculoRegister}
      />
      {/* Marcas */}
      <PrivateRoute exact path="/marcas" component={Marca} />
      <PrivateRoute exact path="/marcas/cadastro" component={MarcaRegister} />
      <PrivateRoute exact path="/marcas/edicao/:id" component={MarcaRegister} />
      {/* Usuarios */}
      <PrivateRoute exact path="/usuarios" component={Usuario} />
      <PrivateRoute
        exact
        path="/usuarios/cadastro"
        component={UsuarioRegister}
      />
      <PrivateRoute exact path="/usuarios/edicao" component={Perfil} />
      {/* DashBoard */}
      <PrivateRoute exact path="/dashboard" component={Dashboard} />
    </Switch>
  );
}

export default Routes;
