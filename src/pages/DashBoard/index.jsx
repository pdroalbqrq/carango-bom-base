// Libs
import { Container, Divider, Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";

// Context
import { useContextProvider } from "../../context";

// Style
import { useStyles } from "./styles";

// Service
import VeiculoService from "../../services/VeiculoService";

function DashBoard() {
  const [dashboard, setDashboard] = useState([]);
  const classes = useStyles();
  const { setLoading } = useContextProvider();

  useEffect(() => {
    let isSubscribed = true;
    setLoading(true);
    VeiculoService.dashboard()
      .then((res) => {
        if (isSubscribed) {
          setDashboard(res);
        }
      })
      .finally(() => {
        setLoading(false);
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
