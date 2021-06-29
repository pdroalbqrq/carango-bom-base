import { makeStyles } from "@material-ui/core";

// Constants
import { DRAWER_WIDTH } from "../../constants";

const useStyles = makeStyles(() => ({
  listContainer: {
    width: DRAWER_WIDTH,
    borderRadius: 4,
  },
}));

export { useStyles };
