import React from 'react';
import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

const Total: React.FC<{
    className?: string;
    total: string;
}> = ({ className, total }) => {
    const { t } = useTranslation('proposals');
    return (
        <Typography variant="body1" className={clsx(className)}>
            {t('totalProposals', {
                amount: total
            })}
        </Typography>
    );
};

export default Total;
