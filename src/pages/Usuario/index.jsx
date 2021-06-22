import React, {  useState } from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

import useErros from "../../hooks/useErros";

import validations from "../../utils/validations";

// Service
import UsuarioService from "../../services/UsuarioService";

function Usuario() {
  const [usuario, setUsuario] = useState({ username: "", password: "" });
  const [erros, validarCampos, possoEnviar] = new useErros(validations);
  const history = useHistory();

  const validacoesUsuario = [
    { nome: "tamanhoMinimo", atributos: ["Usuario", 5] },
    { nome: "tamanhoMaximo", atributos: ["Usuario", 25] },
  ];
  const validacoesSenha = [
    { nome: "tamanhoMinimo", atributos: ["Senha", 8] },
    { nome: "tamanhoMaximo", atributos: ["Senha", 50] },
  ];


  function campoCerto(){
    console.log(erros);
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (possoEnviar()) {
          // UsuarioService.autorizar().then();
          console.log(usuario);
        }
      }}
    >
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
      >
        <Typography variant="h2" component="div" gutterBottom>
          Entrar
        </Typography>
        <TextField
          name="usuario"
          id="usuario"
          label="Usuário"
          onChange={(evt) => {
            setUsuario((prevUser) => ({
              ...prevUser,
              username: evt.target.value,
            }));
            validarCampos(evt, validacoesUsuario);
          }}
          helperText={validations.campoCerto("usuario", erros).texto}
          error={!validations.campoCerto("usuario", erros).valido}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="senha"
          id="senha"
          label="Senha"
          onChange={(evt) => {
            setUsuario((prevUser) => ({
              ...prevUser,
              password: evt.target.value,
            }));
            validarCampos(evt, validacoesSenha);
          }}
          helperText={validations.campoCerto("senha", erros).texto}
          error={!validations.campoCerto("senha", erros).valido}
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />

        <Button
          style={{ margin: 10 }}
          variant="contained"
          color="primary"
          type="submit"
          onClick={() => history.push("/")}
        >
          Entrar
        </Button>

        <Link
          onClick={() => history.push("/cadastro-usuario")}
          style={{ cursor: "pointer" }}
        >
          Não possui uma conta? Clique aqui
        </Link>
      </Grid>
    </form>
  );
}

export default Usuario;
