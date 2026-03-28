import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import NotFoundDark from '@assets/not-found-dark.svg?react';
import NotFoundLight from '@assets/not-found-light.svg?react';
import { Typography } from '@mui/material';
import { readTheme } from '@recoil/settings/selectors';
import classnames from 'classnames';
import { useRecoilValue } from 'recoil';

import { useStyles } from './styles';

const NotFound: React.FC<{
    className?: string;
}> = ({ className }) => {
    const classes = useStyles();
    const { t } = useTranslation('common');
    const theme = useRecoilValue(readTheme);

    return (
        <div className={classnames(className, classes.root)}>
            <div className={classes.content}>
                {theme === 'light' ? <NotFoundLight /> : <NotFoundDark />}
                <Typography variant="body1">{t('notFound')}</Typography>
            </div>
        </div>
    );
};

export default NotFound;
