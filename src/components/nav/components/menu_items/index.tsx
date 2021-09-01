import React from 'react';
import classnames from 'classnames';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Typography,
} from '@material-ui/core';
import { Box } from '@src/components';
import useTranslation from 'next-translate/useTranslation';
import { useStyles } from './styles';
import { getMenuItems } from './utils';

const MenuItems = ({ isOpen = true }) => {
  const classes = useStyles();
  const router = useRouter();
  const { t } = useTranslation('common');
  const items = getMenuItems();

  return (
    <List>
      {items.map((x) => {
        let isActive = false;
        if (x.url === router?.asPath) {
          isActive = true;
        }
        if (router?.asPath?.includes(x.url) && x.url !== '/') {
          isActive = true;
        }

        return (
          <Link href={x.url} key={x.key} passHref>
            <Tooltip
              title={
                !isOpen && (
                <Box className={classes.toolTip}>
                  <Typography variant="h4" className="label">{t(x.key)}</Typography>
                </Box>
                )
              }
              placement="right"
            >
              <ListItem
                button
                className={classnames(classes.root, {
                  active: isActive,
                })}
                component="a"
              >
                <ListItemIcon>{x.icon}</ListItemIcon>
                <ListItemText primary={t(x.key)} />
              </ListItem>
            </Tooltip>
          </Link>
        );
      })}
    </List>
  );
};

export default MenuItems;
