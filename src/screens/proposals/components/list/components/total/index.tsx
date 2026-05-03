import { Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    total: string;
}

const Total = ({ className, total }: Props) => {
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
