import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

function Login() {
  const [loginForm, setLoginForm] = useState({
    username: "",
    senha: "",
    formErrors: {
      username: { valid: false, touched: false, text: "" },
      senha: { valid: false, touched: false, text: "" },
    },
  });

  const { handleUserInput, formatValid, handleTouch, getError } = useErros(
    loginForm,
    setLoginForm
  );
  const history = useHistory();

  const validacoesLogin = [
    formatValid("tamanhoMinimo", ["Usuário", 5]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
    formatValid("obrigatorio", ["Usuário"]),
  ];
  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Senha", 8]),
    formatValid("tamanhoMaximo", ["Senha", 50]),
    formatValid("obrigatorio", ["Senha"]),
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
          name="senha"
          id="senha"
          label="Senha"
          onFocus={(event) => {
            handleTouch(event);
          }}
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          helperText={loginForm.formErrors.senha.text}
          error={getError("senha")}
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
          onClick={() => history.push("/")}
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
