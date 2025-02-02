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

function Cadastro() {
  const { setLoading } = useContextProvider();

  const [usuarioForm, setUsuarioForm] = useState({
    username: "",
    senha: "",
    confirmarSenha: "",
    formErrors: {
      username: { valid: false, text: "" },
      senha: { valid: false, text: "" },
      confirmarSenha: { valid: false, text: "" },
    },
  });

  const { handleUserInput, formatValid, handleTouch, getError } = useErros(
    usuarioForm,
    setUsuarioForm
  );

  const validacoesUsuario = [
    formatValid("tamanhoMinimo", ["Usuário", 5]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
    formatValid("obrigatorio", ["Usuário"]),
  ];
  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Senha", 8]),
    formatValid("tamanhoMaximo", ["Senha", 50]),
    formatValid("obrigatorio", ["Senha"]),
  ];

  const history = useHistory();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (usuarioForm.formValid) {
          setLoading(true);
          UsuarioService.cadastrar({
            username: usuarioForm.username,
            password: usuarioForm.senha,
          })
            .then((res) => {
              history.push("/login");
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
          Cadastre-se
        </Typography>
        <TextField
          inputProps={{ "data-testid": "username-input" }}
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
          inputProps={{ "data-testid": "password-input" }}
          name="senha"
          id="senha"
          label="Senha"
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          error={getError("senha")}
          helperText={usuarioForm.formErrors.senha.text}
          type="password"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          inputProps={{ "data-testid": "confirmpassword-input" }}
          name="confirmarSenha"
          id="repetirSenha"
          label="Repetir senha"
          type="password"
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
          data-testid="submit-btn"
          style={{ margin: 10 }}
          variant="contained"
          color="primary"
          type="submit"
          disabled={!usuarioForm.formValid}
        >
          Cadastrar
        </Button>
        <Link
          data-testid="login-btn"
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
