import { lighten } from '@/utils/color';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router';

import { getMenuItems } from './utils';

const MenuItems = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { t } = useTranslation('common');
    const items = getMenuItems();

    return (
        <List>
            {items.map((x) => {
                const isActive = x.exact ? location.pathname === x.url : location.pathname.startsWith(x.url);

                return (
                    <ListItemButton
                        key={x.key}
                        className={classnames({ active: isActive })}
                        onClick={() => navigate(x.url)}
                        sx={(theme) => ({
                            p: theme.spacing(2, 2.5),
                            '& .MuiListItemIcon-root': {
                                minWidth: '48px'
                            },
                            '& .MuiListItemText-root': {
                                color: theme.palette.custom.general.icon
                            },
                            '&.active': {
                                background: lighten(theme.palette.background.paper, 0.05),
                                '& .MuiListItemIcon-root svg': {
                                    fill: theme.palette.primary.main
                                },
                                '& .MuiListItemText-root': {
                                    color: theme.palette.primary.main
                                }
                            }
                        })}
                    >
                        <ListItemIcon>{x.icon}</ListItemIcon>
                        <ListItemText primary={t(x.key)} />
                    </ListItemButton>
                );
            })}
        </List>
    );
};

export default MenuItems;
