import React, { useEffect, useState } from "react";

// Libs
import { Button, Fab } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

// Service
import VeiculoService from "../../services/VeiculoService";

// Style
import { useStyles } from "./styles";

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
  const [veiculos, setVeiculos] = useState([]);
  const [veiculoSelecionado, setVeiculoSelecionado] = useState();
  const classes = useStyles();
  const history = useHistory();

  function alterar() {
    history.push("/veiculo/edicao/" + veiculoSelecionado.id);
  }

  function excluir() {
    VeiculoService.excluir(veiculoSelecionado).then(() => {
      setVeiculoSelecionado(null);
      carregarMarcas();
    });
  }

  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    VeiculoService.listar().then((dados) => setVeiculos(dados));
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
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!veiculoSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!veiculoSelecionado}
          onClick={() => alterar()}
        >
          Alterar
        </Button>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/veiculo/cadastro")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Veiculo;
