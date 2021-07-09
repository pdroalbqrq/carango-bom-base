import React, { useEffect, useState } from "react";

// Libs
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import VeiculoService from "../../services/VeiculoService";
import MarcaService from "../../services/MarcaService";

// Style
import { useStyles } from "./styles";

function VeiculoRegister() {
  const [veiculo, setVeiculo] = useState({
    marcaId: "",
    modelo: "",
    ano: "",
    valor: "",
    formErrors: {
      modelo: { valid: false, touched: false, text: "" },
      marcaId: { valid: false, touched: false, text: "" },
      ano: { valid: false, touched: false, text: "" },
      valor: { valid: false, touched: false, text: "" },
    },
  });
  const [marcas, setMarcas] = useState([]);
  const classes = useStyles();
  const { handleUserInput, formatValid, handleTouch, getError, formValue } =
    new useErros(veiculo, setVeiculo);
  const history = useHistory();
  const { id } = useParams();

  const validacoesMarca = [formatValid("obrigatorio", ["Marca"])];
  const validacoesModelo = [formatValid("tamanhoMaximo", ["Modelo", 50])];

  const validacoesAno = [];

  const validacoesValor = [];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    let isSubscribed = true;
    MarcaService.listar().then((res) => {
      console.log("teste", res);
      if (isSubscribed) {
        setMarcas(res);
      }
    });

    return () => (isSubscribed = false);
  }, []);

  function marcasMenuItem() {
    return marcas.map((marca) => {
      // console.log(marca);
      return (
        <MenuItem key={marca.id} value={marca.id}>
          {marca.nome}
        </MenuItem>
      );
    });
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (veiculo.formValid) {
          VeiculoService.cadastrar(formValue()).then((res) => {
            setVeiculo({
              ...veiculo,
              marcaId: "",
              modelo: "",
              ano: "",
              valor: "",
            });
            history.goBack();
          });
        }
      }}
    >
      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor="marca">Marca</InputLabel>
        <Select
          id="marcaId"
          name="marcaId"
          value={veiculo.marcaId}
          onChange={(evt) =>
            setVeiculo({ ...veiculo, marcaId: evt.target.value })
          }
          label="Marca"
          margin="none"
          onFocus={(event) => handleTouch(event)}
          onChange={(event) => handleUserInput(event, validacoesMarca)}
          error={getError("marcaId")}
        >
          <MenuItem key="000" value="">
            Selecione
          </MenuItem>
          {marcasMenuItem()}
        </Select>
        <FormHelperText>{veiculo.formErrors.marcaId.text}</FormHelperText>
      </FormControl>

      <TextField
        value={veiculo.modelo}
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
