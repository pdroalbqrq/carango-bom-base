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
      nome: { valid: true, text: "" },
    },
    formValid: true,
  });
  const classes = useStyles();
  const { handleUserInput, formatValid } = useErros();
  const history = useHistory();
  const { id } = useParams();

  const validacoesUsuario = [
    formatValid("tamanhoMinimo", ["Marca", 3]),
    formatValid("tamanhoMaximo", ["Marca", 50]),
  ];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      UsuarioService.consultar(id).then((value) => {
        setUsuario({ ...usuario, ...value });
      });
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        // if (possoEnviar()) {
        //   if (id) {
        //     UsuarioService.alterar({
        //       id,
        //       marca: usuario.marca,
        //       modelo: usuario.modelo,
        //       ano: usuario.ano,
        //       valor: usuario.valor,
        //     }).then((res) => {
        //       history.goBack();
        //     });
        //   } else {
        //     UsuarioService.cadastrar({
        //       marca: usuario.marca,
        //       modelo: usuario.modelo,
        //       ano: usuario.ano,
        //       valor: usuario.valor,
        //     }).then((res) => {
        //       setUsuario("");
        //       history.goBack();
        //     });
        //   }
        // }
      }}
    >
      <TextField
        value={usuario.nome}
        onChange={(event) => {
          handleUserInput(event, validacoesUsuario, usuario, setUsuario);
        }}
        error={!usuario.formErrors.nome.valid}
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
          variant="contained"
          color="secondary"
          onClick={cancelar}
          className={classes.actions}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="primary"
          type="submit"
          // disabled={!possoEnviar()}
          className={classes.actions}
        >
          {id ? "Alterar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

export default UsuarioRegister;
