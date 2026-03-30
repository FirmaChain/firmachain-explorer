import useTranslation from '@/adapters/i18n/useTranslation';
import { useRouter } from '@/adapters/routing/router';
import { lighten } from '@/utils/color';
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import classnames from 'classnames';

import { getMenuItems } from './utils';

const MenuItems = () => {
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
                    <ListItemButton
                        key={x.key}
                        className={classnames({ active: isActive })}
                        onClick={() => router.push(x.url)}
                        sx={(theme) => ({
                            p: theme.spacing(2, 2.5),
                            '& .MuiListItemIcon-root': {
                                minWidth: '48px'
                            },
                            '& .MuiListItemText-root': {
                                color: theme.palette.custom.general.icon
                            },
                            '&.active': {
                                // background: Color(theme.palette.background.paper).lighten(0.5).string(),
                                background: lighten(theme.palette.background.paper, 0.5),
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
