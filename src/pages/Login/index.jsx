import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

// Service
import UsuarioService from "../../services/UsuarioService";

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    formErrors: {
      username: { valid: true, text: "" },
      password: { valid: true, text: "" },
    },
    formValid: true,
  });

  const { handleUserInput, formatValid } = useErros();
  const history = useHistory();

  const validacoesLogin = [
    formatValid("tamanhoMinimo", ["Usuário", 5]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
  ];
  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Usuário", 8]),
    formatValid("tamanhoMaximo", ["Usuário", 50]),
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
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
          name="username"
          id="usuario"
          label="Usuário"
          onChange={(event) =>
            handleUserInput(event, validacoesLogin, loginForm, setLoginForm)
          }
          error={!loginForm.formErrors.username.valid}
          helperText={loginForm.formErrors.username.text}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="password"
          id="senha"
          label="Senha"
          onChange={(event) =>
            handleUserInput(event, validacoesSenha, loginForm, setLoginForm)
          }
          helperText={loginForm.formErrors.password.text}
          error={!loginForm.formErrors.password.valid}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => history.push("/")}
        >
          Entrar
        </Button>

        <Link
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
