import React, { useEffect, useState } from "react";

// Libs
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import { useHistory } from "react-router";

// Context
import { useContextProvider } from "../../context";

// Service
import MarcaService from "../../services/MarcaService";

// Style
import { useStyles } from "./styles";

const colunas = [{ field: "nome", headerName: "Marca", flex: 1 }];

function Marca() {
  const { setLoading } = useContextProvider();
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const classes = useStyles();
  const history = useHistory();

  function alterar() {
    history.push("/marcas/edicao/" + marcaSelecionada.id);
  }

  function excluir() {
    setLoading(true);
    MarcaService.excluir(marcaSelecionada)
      .then(() => {
        setMarcaSelecionada(null);
        carregarMarcas();
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    setLoading(true);
    return MarcaService.listar()
      .then(setMarcas)
      .finally(() => setLoading(false));
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={marcas}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setMarcaSelecionada(gridSelection.data)
        }
      />

      <div className={classes.actionsToolbar}>
        <Button
          data-testid="delete-btn"
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!marcaSelecionada}
          onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          data-testid="edit-btn"
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!marcaSelecionada}
          onClick={() => alterar()}
        >
          Alterar
        </Button>
        <Button
          data-testid="insert-btn"
          className={classes.actions}
          variant="contained"
          color="primary"
          onClick={() => history.push("/marcas/cadastro")}
        >
          Incluir
        </Button>
      </div>
    </div>
  );
}

export default Marca;
