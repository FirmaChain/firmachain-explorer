import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Typography } from '@mui/material';
import classnames from 'classnames';

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
