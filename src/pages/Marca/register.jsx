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
    nome: "",
    formErrors: {
      nome: { valid: false, text: "" },
    },
  });

  const classes = useStyles();
  const { handleUserInput, formatValid, getError, handleTouch, formValue } =
    new useErros(marca, setMarca);
  const history = useHistory();
  const { id } = useParams();

  const validacoesMarca = [
    formatValid("tamanhoMinimo", ["Marca", 3]),
    formatValid("tamanhoMaximo", ["Marca", 25]),
    formatValid("obrigatorio", ["Marca"]),
  ];

  function confirmar() {
    history.push("/marcas");
  }

  useEffect(() => {
    if (id) {
      let isSubscribed = true;
      MarcaService.consultar(id).then((m) => {
        if (isSubscribed) {
          setMarca({ ...marca, nome: m.nome });
        }
      });

      return () => (isSubscribed = false);
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (marca.formValid) {
          if (id) {
            MarcaService.alterar({ id, ...formValue() }).then((res) => {
              confirmar();
            });
          } else {
            MarcaService.cadastrar(formValue()).then((res) => {
              setMarca({ ...marca, marca: "" });
              confirmar();
            });
          }
        }
      }}
    >
      <TextField
        inputProps={{ "data-testid": "marca-input" }}
        value={marca.nome || ""}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesMarca)}
        error={getError("nome")}
        helperText={marca.formErrors.nome.text}
        name="nome"
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
          data-testid="cancel-btn"
          variant="contained"
          color="secondary"
          className={classes.actions}
          onClick={() => confirmar()}
        >
          Cancelar
        </Button>
        <Button
          data-testid="submit-btn"
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
