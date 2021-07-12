import React, { useState } from "react";

// Libs
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";
import { useHistory } from "react-router";

// Context
import { useContextProvider } from "../../context";

// Hooks
import useErros from "../../hooks/useErros";

// Services
import UsuarioService from "../../services/UsuarioService";

function Login() {
  const { setLoading, setIsAuth } = useContextProvider();

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
    formatValid("tamanhoMinimo", ["Senha", 8]),
    formatValid("tamanhoMaximo", ["Senha", 50]),
    formatValid("obrigatorio", ["Senha"]),
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (loginForm.formValid) {
          setLoading(true);
          UsuarioService.autenticar(formValue())
            .then((res) => {
              setIsAuth(true);
              localStorage.setItem("usuario", loginForm.username);
              history.push("/");
            })
            .finally(() => {
              setLoading(false);
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
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <Button
          data-testid="submit-btn"
          style={{ margin: 10 }}
          variant="contained"
          disabled={!loginForm.formValid}
          color="primary"
          type="submit"
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
