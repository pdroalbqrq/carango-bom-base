import React from "react";
import { Button, TextField, Grid, Typography, Link } from "@material-ui/core";

import { useHistory } from "react-router";

function UsuarioRegister() {

  const history = useHistory();
  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
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
          Cadastre-se
        </Typography>
        <TextField
          name="usuario"
          id="usuario"
          label="Usuário"
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
          type="text"
          variant="outlined"
          fullWidth
          required
          margin="normal"
        />
        <TextField
          name="repetirSenha"
          id="repetirSenha"
          label="Repetir senha"
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
        >
          Cadastrar
        </Button>
        <Link
          onClick={() => history.push("/entrar")}
          style={{ cursor: "pointer" }}
        >
          Já possui uma conta? Clique aqui para entrar
        </Link>
      </Grid>
    </form>
  );
}

export default UsuarioRegister;
