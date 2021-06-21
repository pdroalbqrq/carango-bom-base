import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  fab: {
    position: "absolute",
    bottom: "100px",
    right: "100px",
  },
  actionsToolbar: {
    float: "right",
  },
  actions: {
    top: "10px",
    marginLeft: "10px",
  },
}));

export { useStyles };
