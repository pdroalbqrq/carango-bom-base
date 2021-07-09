// Libs
import { Button } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
// Service
import UsuarioService from "../../services/UsuarioService";
// Style
import { useStyles } from "./styles";

const colunas = [{ field: "username", headerName: "Nome", flex: 1 }];

function Usuario() {
  const [usuarios, setUsuarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState();
  const classes = useStyles();
  const history = useHistory();

  function excluir() {
    UsuarioService.excluir(usuarioSelecionado)
      .then(() => {
        setUsuarioSelecionado(null);
        carregarUsuarios();
      })
      .catch(() => {
        handleError();
      });
  }

  function handleError() {
    setUsuarios([]);
    history.push("/");
    window.location.reload();
  }

  useEffect(() => carregarUsuarios(), []);

  function carregarUsuarios() {
    UsuarioService.listar()
      .then((dados) => setUsuarios(dados))
      .catch(() => {
        handleError();
      });
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
          data-testid="delete-btn"
          className={classes.actions}
          variant="contained"
          color="secondary"
          disabled={!usuarioSelecionado}
          onClick={() => excluir()}
        >
          Excluir
        </Button>

        <Button
          data-testid="insert-btn"
          className={classes.actions}
          variant="contained"
          color="primary"
          onClick={() => history.push("/usuarios/cadastro")}
        >
          Incluir
        </Button>
      </div>
    </div>
  );
}

export default Usuario;
