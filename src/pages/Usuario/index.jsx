import React, { useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

import Validator from "../../utils/validations";

// Service
import UsuarioService from "../../services/UsuarioService";
import { lightGreen } from "@material-ui/core/colors";

function Usuario() {
  const [usuarioForm, setUsuarioForm] = useState({
    username: "",
    password: "",
    formErrors: {
      username: { valid: true, text: "" },
      password: { valid: true, text: "" },
    },
    formValid: true,
  });

  const history = useHistory();

  const validacoesUsuario = [
    {
      nome: "tamanhoMinimo",
      atributos: ["Usuario", 5, !usuarioForm.usernameValid],
    },
    {
      nome: "tamanhoMaximo",
      atributos: ["Usuario", 25, !usuarioForm.usernameValid],
    },
  ];
  const validacoesSenha = [
    {
      nome: "tamanhoMinimo",
      atributos: ["Senha", 8, !usuarioForm.passwordValid],
    },
    {
      nome: "tamanhoMaximo",
      atributos: ["Senha", 50, !usuarioForm.passwordValid],
    },
  ];

  function handleUserInput(e, validations) {
    const { name, value } = e.target;

    setUsuarioForm({ ...usuarioForm, [name]: value });
    validateField(name, value, usuarioForm, validations);
  }

  function validateField(fieldName, value, form, validations) {
    let fieldValidationErrors = form.formErrors;
    let usernameValid = form.usernameValid;
    let passwordValid = form.passwordValid;
    let validationsFound = [];

    validations.forEach((validation) => {
      validationsFound.push(
        Validator[validation.nome](value, ...validation.atributos)
      );
    });

    const hasError = validationsFound.find((val) => !val.valido);

    if (hasError) {
      console.log(hasError.valido);
      fieldValidationErrors[fieldName].text = hasError.texto;
      fieldValidationErrors[fieldName].valid = hasError.valido;
    }

    if(!hasError){
      fieldValidationErrors[fieldName].text = "";
      fieldValidationErrors[fieldName].valid = true;
    }
    

    setUsuarioForm(
      {
        ...form,
        formErrors: fieldValidationErrors,
        usernameValid: usernameValid,
        passwordValid: passwordValid,
      },
      validateForm(form)
      );
  }

  function validateForm(form) {
    setUsuarioForm({
      ...form,
      formValid: form.usernameValid && form.passwordValid,
    });
  }

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
          onChange={(event) => handleUserInput(event, validacoesUsuario)}
          error={!usuarioForm.formErrors.username.valid}
          helperText={usuarioForm.formErrors.username.text}
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
          onChange={(event) => handleUserInput(event, validacoesSenha)}
          helperText={usuarioForm.formErrors.password.text}
          error={!usuarioForm.formErrors.password.valid}
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
