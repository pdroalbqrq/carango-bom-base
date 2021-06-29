import React, { useState } from "react";

// Libs
import { AppBar, Toolbar, IconButton, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// Components
import ItensMenu from "../ItensMenu";

// Style
import { useStyles } from "./styles";

function DrawerMenu() {
  const classes = useStyles();

  const [isShowingDrawer, setIsShowingDrawer] = useState(false);

  return (
    <AppBar className={classes.appBar}>
      {isShowingDrawer ? (
        <Drawer
          open={isShowingDrawer}
          onClose={() => setIsShowingDrawer(false)}
        >
          <ItensMenu setIsShowingDrawer={setIsShowingDrawer} />
        </Drawer>
      ) : null}

      <Toolbar>
        <IconButton
          onClick={() => setIsShowingDrawer(!isShowingDrawer)}
          edge="start"
          color="inherit"
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default DrawerMenu;
