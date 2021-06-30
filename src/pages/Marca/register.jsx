import React, { useEffect, useState } from "react";

// Libs
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import MarcaService from "../../services/MarcaService";

// Style
import { useStyles } from "./styles";

function MarcaRegister() {
  const [marca, setMarca] = useState({
    marca: "",
    formErrors: {
      marca: { valid: true, text: "" },
    },
  });

  const classes = useStyles();
  const { handleUserInput, formatValid, getError, handleTouch } = new useErros(
    marca,
    setMarca
  );
  const history = useHistory();
  const { id } = useParams();

  const validacoesMarca = [
    formatValid("tamanhoMinimo", ["Marca", 3]),
    formatValid("tamanhoMaximo", ["Marca", 50]),
  ];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      MarcaService.consultar(id).then((m) =>
        setMarca({ ...marca, marca: m.nome })
      );
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        // if (possoEnviar()) {
        //   if (id) {
        //     MarcaService.alterar({ id, nome: marca }).then((res) => {
        //       history.goBack();
        //     });
        //   } else {
        //     MarcaService.cadastrar({ nome: marca }).then((res) => {
        //       setMarca("");
        //       history.goBack();
        //     });
        //   }
        // }
      }}
    >
      <TextField
        value={marca.marca}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesMarca)}
        error={getError("marca")}
        helperText={marca.formErrors.marca.text}
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
          disabled={!marca.formValid}
          className={classes.actions}
        >
          {id ? "Alterar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

export default MarcaRegister;
