import { isValidElement, ReactNode } from 'react';
import { Tag } from '@components';
import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getStatusInfo } from './utils';

interface Props {
    className?: string;
    id: string;
    title: string | ReactNode;
    status: string;
    description?: string;
}

const SingleProposal = ({ className, id, title, status, description }: Props) => {
    const { t } = useTranslation('proposals');
    const statusInfo = getStatusInfo(status, t);

    return (
        <Box
            className={className}
            sx={(theme) => ({
                width: '100%',
                [theme.breakpoints.up('lg')]: {
                    display: 'grid',
                    gridTemplateColumns: '50px auto min-content',
                    gridGap: theme.spacing(2),
                    my: 2
                }
            })}
        >
            <Box
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    mb: 2.5,
                    [theme.breakpoints.up('lg')]: {
                        alignItems: 'flex-start',
                        mb: 0
                    }
                })}
            >
                <Typography variant="h4" sx={(theme) => ({ color: theme.palette.custom.fonts.fontThree })}>
                    {id}
                </Typography>
                <Box component="span" sx={{ display: { lg: 'none' } }}>
                    <Tag theme={statusInfo.tag} value={statusInfo.value} />
                </Box>
            </Box>
            {/* ================= */}
            {/* ================= */}
            <Box>
                <Box sx={{ mb: 0.5 }}>
                    {isValidElement(title) ? (
                        title
                    ) : (
                        <Typography variant="h3" className="value">
                            {title}
                        </Typography>
                    )}
                </Box>
                {!!description && <Typography variant="body2">{description}</Typography>}
            </Box>
            {/* ================= */}
            {/* ================= */}
            <Box component="span" sx={{ display: { xs: 'none', lg: 'block' } }}>
                <Tag theme={statusInfo.tag} value={statusInfo.value} />
            </Box>
        </Box>
    );
};

export default SingleProposal;
