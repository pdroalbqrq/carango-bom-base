import React, { useEffect, useState } from "react";

// Libs
import { Button, TextField } from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Context
import { useContextProvider } from "../../context";

// Service
import MarcaService from "../../services/MarcaService";

// Style
import { useStyles } from "./styles";

function MarcaRegister() {
  const { setLoading } = useContextProvider();
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
    formatValid("tamanhoMaximo", ["Marca", 25]),
    formatValid("obrigatorio", ["Marca"]),
  ];

  function cancelar() {
    history.push("/marcas");
  }

  useEffect(() => {
    if (id) {
      let isSubscribed = true;
      setLoading(true);
      MarcaService.consultar(id)
        .then((m) => {
          if (isSubscribed) {
            setMarca({ ...marca, nome: m.nome });
          }
        })
        .finally(() => setLoading(false));

      return () => (isSubscribed = false);
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (marca.formValid) {
          setLoading(true);
          if (id) {
            MarcaService.alterar({ id, ...formValue() })
              .then((res) => {
                cancelar();
              })
              .finally(() => setLoading(false));
          } else {
            MarcaService.cadastrar(formValue())
              .then((res) => {
                setMarca({ ...marca, marca: "" });
                cancelar();
              })
              .finally(() => setLoading(false));
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
          onClick={cancelar}
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
