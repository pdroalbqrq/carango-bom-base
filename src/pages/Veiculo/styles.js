import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  fab: {
    position: "absolute",
    bottom: "100px",
    right: "100px",
  },
  actionsToolbar: {
    float: "right",
    marginTop: "10px",
  },
  actions: {
    marginLeft: "10px",
  },
}));

export { useStyles };
