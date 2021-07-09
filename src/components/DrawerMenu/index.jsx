import React, { useState } from "react";

// Libs
import { AppBar, Toolbar, IconButton, Drawer } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

// Components
import ItensMenu from "../ItensMenu";

// Style
import { useStyles } from "./styles";

function DrawerMenu({ auth }) {
  const classes = useStyles();

  const [isShowingDrawer, setIsShowingDrawer] = useState(false);

  return (
    <AppBar data-testid="appBar" className={classes.appBar}>
      {isShowingDrawer ? (
        <Drawer
          data-testid="drawer-menu"
          open={isShowingDrawer}
          onClose={() => setIsShowingDrawer(false)}
        >
          <ItensMenu setIsShowingDrawer={setIsShowingDrawer} auth={auth} />
        </Drawer>
      ) : null}

      <Toolbar>
        <IconButton
          data-testid="hamburguer-icon"
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
