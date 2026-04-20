import React from 'react';
import { Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

const Total: React.FC<{
    className?: string;
    total: string;
}> = ({ className, total }) => {
    const { t } = useTranslation('proposals');
    return (
        <Typography variant="body1" className={classnames(className)}>
            {t('totalProposals', {
                amount: total
            })}
        </Typography>
    );
};

export default Total;
