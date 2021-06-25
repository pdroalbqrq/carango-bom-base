import React from "react";

// Libs
import { Grid, Paper, Typography, Divider, Container } from "@material-ui/core";

// Style
import { useStyles } from "./styles";

const dataDashMOCK = [
  {
    nomeMarca: "GM",
    totalVeiculos: 10,
    totalValor: 50000,
  },
  {
    nomeMarca: "FIAT",
    totalVeiculos: 3,
    totalValor: 20000,
  },
  {
    nomeMarca: "RENAULT",
    totalVeiculos: 2,
    totalValor: 80000,
  },
  {
    nomeMarca: "RENAULT",
    totalVeiculos: 2,
    totalValor: 80000,
  },
  {
    nomeMarca: "RENAULT",
    totalVeiculos: 2,
    totalValor: 80000,
  },
];

function DashBoard() {
  const classes = useStyles();

  return (
    <Grid container justify="center" spacing={8}>
      {dataDashMOCK.map((value, index) => (
        <Grid key={`${value.nomeMarca}-${index}`} item>
          <Paper className={classes.paper} elevation={3}>
            <Typography variant="h6" gutterBottom color="primary">
              {value.nomeMarca}
            </Typography>

            <Divider className={classes.divider} />

            <Container disableGutters className={classes.infoContainer}>
              <Typography gutterBottom>
                {`${value.totalVeiculos} veículos`}
              </Typography>
              <Typography>{`R$${value.totalValor}`}</Typography>
            </Container>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}

export default DashBoard;
