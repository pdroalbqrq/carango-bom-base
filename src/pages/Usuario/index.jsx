import React, {  useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

import validations from "../../utils/validations";

// Service
import UsuarioService from "../../services/UsuarioService";

function Usuario() {
  const [usuarioForm, setUsuarioForm] = useState({
    username: "",
    password: "",
    formErrors: { username: "", password: "" },
    usernameValid: false,
    passwordValid: false,
    formValid: false,
  });
  const [erros, validarCampos, possoEnviar] = new useErros(validations);
  const history = useHistory();

  const validacoesUsuario = [
    { nome: "tamanhoMinimo", atributos: ["Usuario", 5] },
    { nome: "tamanhoMaximo", atributos: ["Usuario", 25] },
  ];
  const validacoesSenha = [
    { nome: "tamanhoMinimo", atributos: ["Senha", 8] },
    { nome: "tamanhoMaximo", atributos: ["Senha", 50] },
  ];


  function handleUserInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    setUsuarioForm({[name]: value});
    validateField(name, value)
  }

  function validateField(fieldName, value) {
  let fieldValidationErrors = usuarioForm.formErrors;
  let usernameValid = usuarioForm.usernameValid;
  let passwordValid = usuarioForm.passwordValid;

      switch(fieldName) {
        case 'username':
          usernameValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
          fieldValidationErrors.username = usernameValid ? '' : ' is invalid';
          break;
        case 'password':
          passwordValid = value.length >= 6;
          fieldValidationErrors.password = passwordValid ? '': ' is too short';
          break;
        default:
          break;
      }
    setUsuarioForm({formErrors: fieldValidationErrors,
                  usernameValid: usernameValid,
                  passwordValid: passwordValid
                }, this.validateForm);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          console.log(usuarioForm);
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
          name="usuario"
          id="usuario"
          label="Usuário"
          value={usuarioForm.username}
          onChange={(event) => handleUserInput(event)}
          // helperText={validations.campoCerto("usuario", erros).texto}
          // error={!validations.campoCerto("usuario", erros).valido}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="senha"
          id="senha"
          label="Senha"
          value={usuarioForm.password}
          onChange={(event) => handleUserInput(event)}
          // onChange={(evt) => {
          //   setUsuarioForm((prevUser) => ({
          //     ...prevUser,
          //     password: evt.target.value,
          //   }));
          //   validarCampos(evt, validacoesSenha);
          // }}
          // helperText={validations.campoCerto("senha", erros).texto}
          // error={!validations.campoCerto("senha", erros).valido}
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
          onClick={() => history.push("/cadastro-usuario")}
          style={{ cursor: "pointer" }}
        >
          Não possui uma conta? Clique aqui
        </Link>
      </Grid>
    </form>
  );
}

export default Usuario;
