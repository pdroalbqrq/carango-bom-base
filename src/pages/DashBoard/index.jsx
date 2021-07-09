// Libs
import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
// Style
import { useStyles } from "./styles";
// Service
import VeiculoService from "../../services/VeiculoService";

const dataDashMOCK = [
  {
    marca: "GM",
    numVeiculos: 10,
    somaValor: 50000,
  },
  {
    marca: "FIAT",
    numVeiculos: 3,
    somaValor: 20000,
  },
  {
    marca: "RENAULT",
    numVeiculos: 2,
    somaValor: 80000,
  },
  {
    marca: "RENAULT",
    numVeiculos: 2,
    somaValor: 80000,
  },
  {
    marca: "RENAULT",
    numVeiculos: 2,
    somaValor: 80000,
  },
];

function DashBoard() {
  const [dashboard, setDashboard] = useState([]);
  const classes = useStyles();

  useEffect(() => {
    let isSubscribed = true;
    VeiculoService.dashboard().then((res) => {
      console.log(res);
      console.log(dataDashMOCK);
      if (isSubscribed) {
        setDashboard(res);
      }
    });
    return () => (isSubscribed = false);
  }, []);

  return (
    <Grid container justify="center" spacing={8} data-testid="dashboard-grid">
      {dashboard.map((value, index) => (
        <Grid key={`${value.marca}-${index}`} item>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" gutterBottom color="primary">
              {value.marca}
            </Typography>

            <Divider className={classes.divider} />

            <Container disableGutters className={classes.infoContainer}>
              <Typography gutterBottom>
                {`${value.numVeiculos} veículos`}
              </Typography>
              <Typography>{`${value.somaValor.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}`}</Typography>
            </Container>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashBoard;
