// Libs
import { Button, TextField, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
// Hooks
import useErros from "../../hooks/useErros";
// Service
import UsuarioService from "../../services/UsuarioService";
// Style
import { useStyles } from "./styles";

function Perfil() {
  const [usuario, setUsuario] = useState({
    password: "",
    username: "",
    formErrors: {
      password: { valid: false, text: "" },
    },
  });

  const classes = useStyles();
  const { handleUserInput, formatValid, getError, handleTouch, formValue } =
    new useErros(usuario, setUsuario);

  const validacoesSenha = [
    formatValid("tamanhoMinimo", ["Senha", 7]),
    formatValid("tamanhoMaximo", ["Senha", 25]),
    formatValid("obrigatorio", ["Senha"]),
  ];

  useEffect(() => {
    setUsuario((prevUser) => {
      return { ...prevUser, username: localStorage.getItem("usuario") };
    });
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (usuario.formValid) {
          UsuarioService.alterar(formValue()).then(() => {
            setUsuario({ ...usuario, password: "" });
          });
        }
      }}
    >
      <Typography variant="h4" component="div" gutterBottom>
        {usuario.username}
      </Typography>
      <TextField
        inputProps={{ "data-testid": "usuario-input" }}
        value={usuario.password || ""}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesSenha)}
        error={getError("password")}
        helperText={usuario.formErrors.password.text}
        name="password"
        id="password"
        label="Nova senha"
        type="password"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <div className={classes.actionsToolbar}>
        <Button
          data-testid="submit-btn"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!usuario.formValid}
          className={classes.actions}
        >
          Alterar senha
        </Button>
      </div>
    </form>
  );
}

export default Perfil;
