import React from 'react';
import { Box, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';

const SingleValidator: React.FC<{
    className?: string;
    idx: string;
    validator: React.ReactNode;
    commission: string;
    votingPower: React.ReactNode;
    status: {
        status: string;
        theme: string;
    };
}> = ({ className, validator, commission, votingPower, status }) => {
    const { t } = useTranslation('validators');
    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                my: 2,
                '& .item': {
                    mb: 2,
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree,
                        '&.popover': {
                            display: 'flex',
                            alignItems: 'flex-start'
                        }
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    '& .status.one': { color: theme.palette.custom.tags.one },
                    '& .status.two': { color: theme.palette.custom.tags.two },
                    '& .status.three': { color: theme.palette.custom.tags.three },
                    '& .status.zero': { color: theme.palette.custom.tags.zero }
                },
                '& .flex': {
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                    '& > div': {
                        width: '50%'
                    }
                }
            })}
        >
            <div className="item">
                <Typography variant="h4" className="label">
                    {t('validator')}
                </Typography>
                {validator}
            </div>
            <div className="item">
                <Typography variant="h4" className="label">
                    {t('votingPower')}
                </Typography>
                {votingPower}
            </div>
            <div className="flex">
                <div className="item">
                    <Typography variant="h4" className="label">
                        {t('status')}
                    </Typography>
                    <Typography variant="body1" className={classnames('value', 'status', status.theme)}>
                        {t(status.status)}
                    </Typography>
                </div>
                <div className="item">
                    <Typography variant="h4" className="label">
                        {t('commission')}
                    </Typography>
                    <Typography variant="body1" className="value">
                        {commission}
                    </Typography>
                </div>
            </div>
        </Box>
    );
};

export default SingleValidator;
