import React from 'react';
import classnames from 'classnames';
import {
  Drawer,
  AppBar,
  ClickAwayListener,
} from '@material-ui/core';
// import { useSettingsContext } from '@contexts';
// import BigDipperLogoWhite from '@assets/big-dipper-white.svg';
// import BigDipperLogoRed from '@assets/big-dipper-red.svg';
import FirmachainTitle from '@public/firmachain/firma_chain_title.svg';
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
  // const { theme } = useSettingsContext();
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
          {/* <ActionBar toggleNetwork={toggleNetwork} /> */}
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
          {/* <BigDipperLogoWhite
            className={classes.logo}
            onClick={toggleMenu}
            role="button"
          /> */}
          <FirmachainTitle
            className={classes.logo}
            onClick={toggleMenu}
            role="button"
          />
          <MenuItems isOpen={isMenu} />
        </Drawer>
      </div>
    </ClickAwayListener>
  );
};

export default Desktop;
