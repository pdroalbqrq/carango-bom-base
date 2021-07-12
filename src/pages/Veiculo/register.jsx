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

// Context
import { useContextProvider } from "../../context";

function VeiculoRegister() {
  const { setLoading } = useContextProvider();

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

  const validacoesAno = [
    formatValid("obrigatorio", ["Ano"]),
    formatValid("anoValido", []),
  ];

  const validacoesValor = [
    formatValid("obrigatorio", ["Valor"]),
    formatValid("precoValido", ["Valor"]),
  ];

  function cancelar() {
    history.goBack();
  }

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    MarcaService.listar()
      .then((res) => {
        if (isSubscribed) {
          setMarcas(res);
        }
      })
      .finally(() => {
        setLoading(false);
      });

    return () => (isSubscribed = false);
  }, []);

  function marcasMenuItem() {
    return marcas.map((marca) => {
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
        setLoading(true);
        if (veiculo.formValid) {
          VeiculoService.cadastrar(formValue())
            .then((res) => {
              setVeiculo({
                ...veiculo,
                marcaId: "",
                modelo: "",
                ano: "",
                valor: "",
              });
              history.goBack();
            })
            .finally(() => {
              setLoading(false);
            });
        }
      }}
    >
      <FormControl variant="outlined" fullWidth required>
        <InputLabel htmlFor="marca">Marca</InputLabel>
        <Select
          inputProps={{ "data-testid": "marca-input" }}
          id="marcaId"
          name="marcaId"
          value={veiculo.marcaId}
          onChange={(evt) => {
            setVeiculo({ ...veiculo, marcaId: evt.target.value });
            handleUserInput(evt, validacoesMarca);
          }}
          label="Marca"
          margin="none"
          onFocus={(event) => handleTouch(event)}
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
        inputProps={{ "data-testid": "modelo-input" }}
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
        inputProps={{ "data-testid": "ano-input" }}
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
        inputProps={{ "data-testid": "valor-input" }}
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
