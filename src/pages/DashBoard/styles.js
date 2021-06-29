import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  paper: {
    height: 200,
    width: 200,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  divider: {
    width: "100%",
    marginBottom: 10,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexGrow: 1,
  },
}));

export { useStyles };
