import React, { useEffect, useState } from "react";

// Libs
import { Button, Fab } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

// Service
import MarcaService from "../../services/MarcaService";

// Style
import { useStyles } from "./styles";

const colunas = [{ field: "nome", headerName: "Marca", flex: 1 }];

function Marca() {
  const [marcas, setMarcas] = useState([]);
  const [marcaSelecionada, setMarcaSelecionada] = useState();
  const classes = useStyles();
  const history = useHistory();

  function alterar() {
    history.push("/marca/edicao/" + marcaSelecionada.id);
  }

  function excluir() {
    MarcaService.excluir(marcaSelecionada).then(() => {
      setMarcaSelecionada(null);
      carregarMarcas();
    });
  }

  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    MarcaService.listar().then((dados) => setMarcas(dados));
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
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!marcaSelecionada}
          onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!marcaSelecionada}
          onClick={() => alterar()}
        >
          Alterar
        </Button>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/marca/cadastro")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Marca;
