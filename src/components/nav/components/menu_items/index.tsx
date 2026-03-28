import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { useRouter } from '@/adapters/routing/router';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import classnames from 'classnames';

import { useStyles } from './styles';
import { getMenuItems } from './utils';

const MenuItems = () => {
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
                        <ListItem
                            button
                            className={classnames(classes.root, {
                                active: isActive
                            })}
                            component="a"
                        >
                            <ListItemIcon>{x.icon}</ListItemIcon>
                            <ListItemText primary={t(x.key)} />
                        </ListItem>
                    </Link>
                );
            })}
        </List>
    );
};

export default MenuItems;
