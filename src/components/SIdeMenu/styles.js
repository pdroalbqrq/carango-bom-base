import { makeStyles } from "@material-ui/core";

// Constants
import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles(() => ({
  main: {
    width: DRAWER_WIDTH,
    border: "1px solid rgba(224, 224, 224, 1)",
    borderRadius: 4,
  },
  listContainer: {
    padding: 0,
  },
}));

export { useStyles };
