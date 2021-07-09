import React, { useEffect, useState } from "react";

// Libs
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import VeiculoService from "../../services/VeiculoService";

// Style
import { useStyles } from "./styles";

function VeiculoRegister() {
  const [veiculo, setVeiculo] = useState({
    marca: "",
    modelo: "",
    ano: "",
    valor: "",
    formErrors: {
      modelo: { valid: true, text: "" },
      ano: { valid: true, text: "" },
      valor: { valid: true, text: "" },
    },
    formValid: true,
  });
  const classes = useStyles();
  const { handleUserInput, formatValid, getError, handleTouch, formValue } =
    new useErros(veiculo, setVeiculo);
  const history = useHistory();
  const { id } = useParams();

  const validacoesModelo = [
    formatValid("tamanhoMinimo", ["Modelo", 2]),
    formatValid("tamanhoMaximo", ["Modelo", 100]),
    formatValid("obrigatorio", ["Modelo"]),
  ];

  const validacoesAno = [formatValid("obrigatorio", ["Ano"])];

  const validacoesValor = [formatValid("obrigatorio", ["Valor"])];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    if (id) {
      VeiculoService.consultar(id).then((value) => {
        setVeiculo({ ...veiculo, ...value });
      });
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor="marca">Marca</InputLabel>
        <Select
          id="marca"
          name="marca"
          value={veiculo.marca}
          onChange={(evt) =>
            setVeiculo({ ...veiculo, marca: evt.target.value })
          }
          label="Marca"
          margin="none"
        >
          <MenuItem value="">Selecione</MenuItem>
          <MenuItem value={0}>marca 1</MenuItem>
          <MenuItem value={1}>marca 2</MenuItem>
          <MenuItem value={2}>marca 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        value={veiculo.modelo || ""}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesModelo)}
        error={getError("modelo")}
        helperText={veiculo.formErrors.modelo.text}
        name="modelo"
        id="modelo"
        label="Modelo"
        type="text"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={veiculo.ano}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesAno)}
        error={getError("ano")}
        helperText={veiculo.formErrors.ano.text}
        name="ano"
        id="ano"
        label="Ano"
        type="number"
        variant="outlined"
        fullWidth
        required
        margin="normal"
      />

      <TextField
        value={veiculo.valor}
        onFocus={(event) => handleTouch(event)}
        onChange={(event) => handleUserInput(event, validacoesValor)}
        error={getError("valor")}
        helperText={veiculo.formErrors.valor.text}
        name="valor"
        id="valor"
        label="Valor"
        type="number"
        variant="outlined"
        fullWidth
        required
        margin="normal"
        InputProps={{
          startAdornment: <InputAdornment position="start">R$</InputAdornment>,
        }}
      />

      <div className={classes.actionsToolbar}>
        <Button
          data-testid="cancel-btn"
          variant="contained"
          color="secondary"
          onClick={cancelar}
          className={classes.actions}
        >
          Cancelar
        </Button>
        <Button
          data-testid="register-btn"
          variant="contained"
          color="primary"
          type="submit"
          disabled={!veiculo.formValid}
          className={classes.actions}
        >
          {id ? "Alterar" : "Cadastrar"}
        </Button>
      </div>
    </form>
  );
}

export default VeiculoRegister;
