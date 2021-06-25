import React, { useEffect, useState } from "react";

// Libs
import { Button, Fab } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/Add";
import { useHistory } from "react-router";

// Service
import UsuarioService from "../../services/UsuarioService";

// Style
import { useStyles } from "./styles";

const colunas = [{ field: "nome", headerName: "Nome", flex: 1 }];

function Marca() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const classes = useStyles();
  const history = useHistory();

  function alterar() {
    history.push("/usuario/edicao/" + usuarioSelecionado.id);
  }

  function excluir() {
    UsuarioService.excluir(usuarioSelecionado).then(() => {
      setUsuarioSelecionado(null);
      carregarMarcas();
    });
  }

  useEffect(() => carregarMarcas(), []);

  function carregarMarcas() {
    UsuarioService.listar().then((dados) => setUsuarios(dados));
  }

  return (
    <div style={{ height: 300, width: "100%" }}>
      <DataGrid
        rows={usuarios}
        columns={colunas}
        onRowSelected={(gridSelection) =>
          setUsuarioSelecionado(gridSelection.data)
        }
      />

      <div className={classes.actionsToolbar}>
        <Button
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!usuarioSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </Button>
        <Button
          className={classes.actions}
          variant="contained"
          color="primary"
          disabled={!usuarioSelecionado}
          onClick={() => alterar()}
        >
          Alterar
        </Button>
      </div>

      <Fab
        color="primary"
        aria-label="add"
        className={classes.fab}
        onClick={() => history.push("/usuario/cadastro")}
      >
        <AddIcon />
      </Fab>
    </div>
  );
}

export default Marca;
