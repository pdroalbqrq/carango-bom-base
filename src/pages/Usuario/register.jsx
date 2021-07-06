import React, { useEffect, useState } from "react";

// Libs
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import UsuarioService from "../../services/UsuarioService";

// Style
import { useStyles } from "./styles";

function UsuarioRegister() {
  const [usuario, setUsuario] = useState({
    nome: "",
    formErrors: {
      nome: { valid: false, text: "" },
    },
  });
  const classes = useStyles();
  const { handleUserInput, formatValid, handleTouch, getError } = new useErros(
    usuario,
    setUsuario
  );
  const history = useHistory();
  const { id } = useParams();

  const validacoesUsuario = [
    formatValid("tamanhoMinimo", ["Usuário", 3]),
    formatValid("tamanhoMaximo", ["Usuário", 25]),
    formatValid("obrigatorio", ["Usuário"]),
  ];

  function confirm() {
    history.push("/usuarios");
  }

  useEffect(() => {
    if (id) {
      let isSubscribed = true;
      UsuarioService.consultar(id).then((value) => {
        console.log(value);
        if (isSubscribed) {
          setUsuario({ ...usuario, ...value });
        }
      });
      return () => (isSubscribed = false);
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        const { nome } = usuario;
        if (usuario.formValid) {
          if (id) {
            UsuarioService.alterar({
              id,
              nome,
            }).then((res) => {
              confirm();
            });
          } else {
            UsuarioService.cadastrar({
              nome,
            }).then((res) => {
              setUsuario({
                ...usuario,
                nome: "",
              });
              confirm();
            });
          }
        }
      }}
    >
      <TextField
        inputProps={{ "data-testid": "name-input" }}
        value={usuario.nome}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesUsuario)}
        error={getError("nome")}
        helperText={usuario.formErrors.nome.text}
        name="nome"
        id="nome"
        label="Nome"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <div className={classes.actionsToolbar}>
        <Button
          data-testid="cancel-btn"
          variant="contained"
          color="secondary"
          onClick={confirm}
          className={classes.actions}
        >
          Cancelar
        </Button>
        <Button
          data-testid="submit-btn"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!usuario.formValid}
          className={classes.actions}
        >
          {id ? "Alterar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

export default UsuarioRegister;
