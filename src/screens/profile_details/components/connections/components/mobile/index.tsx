import React from 'react';
import { chainConfig } from '@/configs';
import { Box, Divider, Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import { readDate, useSettingsStore } from '@zustand/settings';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

const Mobile: React.FC<{
    className?: string;
    items?: ProfileConnectionType[];
}> = ({ className, items }) => {
    const dateFormat = useSettingsStore(readDate);
    const { t } = useTranslation('accounts');

    return (
        <Box className={classnames(className)}>
            {items.map((x, i) => {
                const checkIdentifier = new RegExp(`^(${chainConfig.prefix.account})`).test(x.identifier);
                return (
                    <React.Fragment key={`votes-mobile-${i}`}>
                        <Box sx={{ my: 2 }}>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': {
                                        mb: 1,
                                        color: theme.palette.custom.fonts.fontThree
                                    },
                                    '& p.value': {
                                        color: theme.palette.custom.fonts.fontTwo,
                                        wordBreak: 'break-all'
                                    },
                                    '& a': {
                                        color: theme.palette.custom.fonts.highlight
                                    }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('network')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {x.network.toUpperCase()}
                                </Typography>
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': {
                                        mb: 1,
                                        color: theme.palette.custom.fonts.fontThree
                                    },
                                    '& p.value': {
                                        color: theme.palette.custom.fonts.fontTwo,
                                        wordBreak: 'break-all'
                                    },
                                    '& a': {
                                        color: theme.palette.custom.fonts.highlight
                                    }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('identifier')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {checkIdentifier && (
                                        <Link to={ACCOUNT_DETAILS(x.identifier)}>
                                            <Typography variant="body1" className="value" component="a">
                                                {x.identifier}
                                            </Typography>
                                        </Link>
                                    )}
                                    {new RegExp(`^(${chainConfig.prefix.account})`).test(x.identifier) === false && x.identifier}
                                </Typography>
                            </Box>
                            <Box
                                sx={(theme) => ({
                                    mb: 2,
                                    '& .label': {
                                        mb: 1,
                                        color: theme.palette.custom.fonts.fontThree
                                    },
                                    '& p.value': {
                                        color: theme.palette.custom.fonts.fontTwo,
                                        wordBreak: 'break-all'
                                    },
                                    '& a': {
                                        color: theme.palette.custom.fonts.highlight
                                    }
                                })}
                            >
                                <Typography variant="h4" className="label">
                                    {t('creationTime')}
                                </Typography>
                                <Typography variant="body1" className="value">
                                    {formatDayJs(dayjs.utc(x.creationTime), dateFormat)}
                                </Typography>
                            </Box>
                        </Box>
                        {i !== items.length - 1 && <Divider />}
                    </React.Fragment>
                );
            })}
        </Box>
    );
};

export default Mobile;
