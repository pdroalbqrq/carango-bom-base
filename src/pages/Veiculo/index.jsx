import React, { useEffect, useState } from "react";

// Libs
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router";

// Service
import VeiculoService from "../../services/VeiculoService";

// Style
import { useStyles } from "./styles";

// Context
import { useContextProvider } from "../../context";

const colunas = [
  {
    field: "marca",
    headerName: "Marca",
    flex: 1,
    valueGetter: ({ value }) => value.nome,
  },
  { field: "modelo", headerName: "Modelo", flex: 1 },
  { field: "ano", headerName: "Ano", flex: 1 },
  { field: "valor", headerName: "Valor", flex: 1 },
];

function Veiculo() {
  const { setLoading } = useContextProvider();

  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const classes = useStyles();
  const history = useHistory();

  function excluir() {
    setLoading(true);
    VeiculoService.excluir(veiculoSelecionado)
      .then(() => {
        setVeiculoSelecionado(null);
        carregarVeiculos();
      })
      .finally(() => {
        setLoading(false);
      });
  }

  useEffect(() => carregarVeiculos(), []);

  function carregarVeiculos() {
    setLoading(true);
    VeiculoService.listar()
      .then((dados) => setVeiculos(dados))
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={veiculos}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setVeiculoSelecionado(gridSelection.data)
        }
      />

      <div className={classes.actionsToolbar}>
        <Button
          data-testid="delete-btn"
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!veiculoSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </Button>

        <Button
          data-testid="insert-btn"
          className={classes.actions}
          variant="contained"
          color="primary"
          onClick={() => history.push("/veiculos/cadastro")}
        >
          Incluir
        </Button>
      </div>
    </div>
  );
}

export default Veiculo;
