import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import UseErros from "../../hooks/useErros";

function Cadastro() {
  const [usuarioForm, setUsuarioForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    formErrors: {
      username: { valid: true, text: "" },
      password: { valid: true, text: "" },
      confirmPassword: { valid: true, text: "" },
    },
    formValid: true,
  });
  const [password, setPassword] = useState("");

  const formValidation = new UseErros();

  const validacoesUsuario = [
    {
      nome: "tamanhoMinimo",
      atributos: ["Usuário", 5],
    },
    {
      nome: "tamanhoMaximo",
      atributos: ["Usuário", 25],
    },
  ];
  const validacoesSenha = [
    {
      nome: "tamanhoMinimo",
      atributos: ["Senha", 8],
    },
    {
      nome: "tamanhoMaximo",
      atributos: ["Senha", 50],
    },
  ];

  const history = useHistory();
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
          Cadastre-se
        </Typography>
        <TextField
          name="username"
          id="usuario"
          label="Usuário"
          type="text"
          variant="outlined"
          fullWidth
          onChange={(event) =>
            formValidation.handleUserInput(
              event,
              validacoesUsuario,
              usuarioForm,
              setUsuarioForm
            )
          }
          error={!usuarioForm.formErrors.username.valid}
          helperText={usuarioForm.formErrors.username.text}
          required
          margin="normal"
        />
        <TextField
          name="password"
          id="senha"
          label="Senha"
          onChange={(event) => {
            setPassword(event.target.value);
            formValidation.handleUserInput(
              event,
              validacoesSenha,
              usuarioForm,
              setUsuarioForm
            );
          }}
          error={!usuarioForm.formErrors.password.valid}
          helperText={usuarioForm.formErrors.password.text}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="confirmPassword"
          id="repetirSenha"
          label="Repetir senha"
          type="text"
          onChange={(event) =>
            formValidation.handleUserInput(
              event,
              validacoesSenha,
              usuarioForm,
              setUsuarioForm
            )
          }
          error={!usuarioForm.formErrors.confirmPassword.valid}
          helperText={usuarioForm.formErrors.confirmPassword.text}
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
        >
          Cadastrar
        </Button>
        <Link
          onClick={() => history.push("/login")}
          style={{ cursor: "pointer" }}
        >
          Já possui uma conta? Clique aqui para entrar
        </Link>
      </Grid>
    </form>
  );
}

export default Cadastro;
