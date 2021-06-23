import React, { useEffect, useState } from "react";

// Libs
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@material-ui/core";
import { useHistory, useParams } from "react-router";

// Hooks
import useErros from "../../hooks/useErros";

// Service
import VeiculoService from "../../services/VeiculoService";

// Validations
import validations from "../../utils/validations";

// Style
import { useStyles } from "./styles";

function VeiculoRegister() {
  const [veiculo, setVeiculo] = useState({
    marca: "",
    modelo: "",
    ano: "",
    valor: "",
  });
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
      VeiculoService.consultar(id).then((veiculo) => setVeiculo(veiculo));
    }
  }, [id]);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();

        if (possoEnviar()) {
          if (id) {
            VeiculoService.alterar({
              id,
              marca: veiculo.marca,
              modelo: veiculo.modelo,
              ano: veiculo.ano,
              valor: veiculo.valor,
            }).then((res) => {
              history.goBack();
            });
          } else {
            VeiculoService.cadastrar({
              marca: veiculo.marca,
              modelo: veiculo.modelo,
              ano: veiculo.ano,
              valor: veiculo.valor,
            }).then((res) => {
              setVeiculo("");
              history.goBack();
            });
          }
        }
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
          margin="normal"
        >
          <MenuItem value="">Selecione</MenuItem>
          <MenuItem value={0}>marca 1</MenuItem>
          <MenuItem value={1}>marca 2</MenuItem>
          <MenuItem value={2}>marca 3</MenuItem>
        </Select>
      </FormControl>

      <TextField
        value={veiculo.modelo}
        onChange={(evt) => {
          setVeiculo({ ...veiculo, modelo: evt.target.value });
          // validarCampos(evt, tiposValidacao);
        }}
        // helperText={erros.tamanhoMinimo.texto || erros.tamanhoMaximo.texto}
        // error={!erros.tamanhoMinimo.valido || !erros.tamanhoMaximo.valido}
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
        onChange={(evt) => {
          setVeiculo({ ...veiculo, ano: evt.target.value });
          // validarCampos(evt, tiposValidacao);
        }}
        // helperText={erros.tamanhoMinimo.texto || erros.tamanhoMaximo.texto}
        // error={!erros.tamanhoMinimo.valido || !erros.tamanhoMaximo.valido}
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
        onChange={(evt) => {
          setVeiculo({ ...veiculo, valor: evt.target.value });
          // validarCampos(evt, tiposValidacao);
        }}
        // helperText={erros.tamanhoMinimo.texto || erros.tamanhoMaximo.texto}
        // error={!erros.tamanhoMinimo.valido || !erros.tamanhoMaximo.valido}
        name="valor"
        id="valor"
        label="Valor"
        type="number"
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

export default VeiculoRegister;
