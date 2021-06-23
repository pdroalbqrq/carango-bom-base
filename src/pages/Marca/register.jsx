import React, { useEffect, useState } from "react";

// Libs
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import MarcaService from "../../services/MarcaService";

// Validations
import validations from "../../utils/validations";

// Style
import { useStyles } from "./styles";

function MarcaRegister() {
  const [marca, setMarca] = useState("");
  const classes = useStyles();

  const history = useHistory();
  const { id } = useParams();
  const [erros, validarCampos, possoEnviar] = useErros(validations);

  const tiposValidacao = [
    { nome: "tamanhoMinimo", atributos: ["marca", 3] },
    { nome: "tamanhoMaximo", atributos: ["marca", 10] },
  ];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      MarcaService.consultar(id).then((m) => setMarca(m.nome));
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          if (id) {
            MarcaService.alterar({ id, nome: marca }).then((res) => {
              history.goBack();
            });
          } else {
            MarcaService.cadastrar({ nome: marca }).then((res) => {
              setMarca("");
              history.goBack();
            });
          }
        }
      }}
    >
      <TextField
        value={marca}
        onChange={(evt) => {
          setMarca(evt.target.value);
          validarCampos(evt, tiposValidacao);
        }}
        helperText={erros.tamanhoMinimo.texto || erros.tamanhoMaximo.texto}
        error={!erros.tamanhoMinimo.valido || !erros.tamanhoMaximo.valido}
        name="marca"
        id="marca"
        label="Marca"
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
          disabled={!possoEnviar()}
          className={classes.actions}
        >
          {id ? "Alterar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

export default MarcaRegister;
