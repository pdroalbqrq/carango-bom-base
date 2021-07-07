import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

import UsuarioService from "../../services/UsuarioService";

function Login({ setAuth }) {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    formErrors: {
      username: { valid: false, touched: false, text: "" },
      password: { valid: false, touched: false, text: "" },
    },
  });

  const { handleUserInput, formatValid, handleTouch, getError, formValue } =
    useErros(loginForm, setLoginForm);
  const history = useHistory();

  const validacoesLogin = [
    formatValid("tamanhoMinimo", ["Usuário", 5]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
    formatValid("obrigatorio", ["Usuário"]),
  ];
  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Senha", 7]),
    formatValid("tamanhoMaximo", ["Senha", 50]),
    formatValid("obrigatorio", ["Senha"]),
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (loginForm.formValid) {
          UsuarioService.autenticar(formValue()).then((res) => {
            setAuth(true);
            history.push("/");
          });
        }
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography variant="h2" component="div" gutterBottom>
          Entrar
        </Typography>
        <TextField
          inputProps={{ "data-testid": "username-input" }}
          name="username"
          id="usuario"
          label="Usuário"
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesLogin)}
          error={getError("username")}
          helperText={loginForm.formErrors.username.text}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          inputProps={{ "data-testid": "password-input" }}
          name="password"
          id="senha"
          label="Senha"
          onFocus={(event) => {
            handleTouch(event);
          }}
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          helperText={loginForm.formErrors.password.text}
          error={getError("password")}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <Button
          style={{ margin: 10 }}
          variant="contained"
          disabled={!loginForm.formValid}
          color="primary"
          type="submit"
          data-testid="submit-btn"
        >
          Entrar
        </Button>

        <Link
          data-testid="register-btn"
          onClick={() => history.push("/cadastro")}
          style={{ cursor: "pointer" }}
        >
          Não possui uma conta? Clique aqui
        </Link>
      </Grid>
    </form>
  );
}

export default Login;
