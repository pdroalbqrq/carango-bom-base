import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import UseErros from "../../hooks/useErros";

function Cadastro() {
  const [usuarioForm, setUsuarioForm] = useState({
    username: "",
    senha: "",
    confirmarSenha: "",
    formErrors: {
      username: { valid: true, text: "" },
      senha: { valid: true, text: "" },
      confirmarSenha: { valid: true, text: "" },
    },
  });

  const { handleUserInput, formatValid, handleTouch, getError } = new UseErros(
    usuarioForm,
    setUsuarioForm
  );

  const validacoesUsuario = [
    formatValid("tamanhoMinimo", ["Usuário", 5]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
  ];
  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Senha", 8]),
    formatValid("tamanhoMaximo", ["Senha", 50]),
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
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesUsuario)}
          error={getError("username")}
          helperText={usuarioForm.formErrors.username.text}
          required
          margin="normal"
        />
        <TextField
          name="senha"
          id="senha"
          label="Senha"
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          error={getError("senha")}
          helperText={usuarioForm.formErrors.senha.text}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="confirmarSenha"
          id="repetirSenha"
          label="Repetir senha"
          type="text"
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          error={getError("confirmarSenha")}
          helperText={usuarioForm.formErrors.confirmarSenha.text}
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
          disabled={!usuarioForm.formValid}
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
