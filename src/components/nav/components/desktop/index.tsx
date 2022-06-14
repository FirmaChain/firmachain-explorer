import React from 'react';
import classnames from 'classnames';
import {
  Drawer,
  AppBar,
  ClickAwayListener,
} from '@material-ui/core';
import FirmachainLogo from '@assets/firma_chain_title.svg';
import { useStyles } from './styles';
import { useDesktop } from './hooks';
import {
  MenuItems,
  TitleBar,
} from '..';
import { ActionBar } from './components';

const Desktop: React.FC<{
  className?: string;
  title: string;
}> = ({
  className, title,
}) => {
  const classes = useStyles();
  const {
    isMenu,
    toggleMenu,
    turnOffAll,
    toggleNetwork,
    isNetwork,
  } = useDesktop();

  return (
    <ClickAwayListener onClickAway={turnOffAll}>
      <div
        className={classnames(className, classes.root)}
      >
        <AppBar
          position="fixed"
          className={classnames(classes.appBar, {
            open: isMenu,
          })}
        >
          <ActionBar
            toggleNetwork={toggleNetwork}
            isNetwork={isNetwork}
          />
          <TitleBar title={title} />
        </AppBar>
        <Drawer
          variant="permanent"
          className={classnames(classes.drawer, {
            open: isMenu,
            closed: !isMenu,
            [classes.drawerOpen]: isMenu,
            [classes.drawerClose]: !isMenu,
          })}
          classes={{
            paper: classnames({
              open: isMenu,
              closed: !isMenu,
              [classes.drawerOpen]: isMenu,
              [classes.drawerClose]: !isMenu,
            }),
          }}
        >
          <FirmachainLogo
            className={classes.logo}
            onClick={toggleMenu}
            role="button"
          />
          <MenuItems />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
