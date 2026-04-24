import React from 'react';
import CopyIcon from '@assets/icon-copy.svg?react';
import { Box, ConditionExplanation, InfoPopover, Tag } from '@components';
import { useScreenSize } from '@hooks';
import { Divider, Typography } from '@mui/material';
import { getMiddleEllipsis } from '@utils/get_middle_ellipsis';
import { getValidatorStatus } from '@utils/get_validator_status';
import { ACCOUNT_DETAILS } from '@utils/go_to_page';
import Big from 'big.js';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

import { OverviewType, StatusType } from '../../types';
import { useAddress } from './hooks';
import { getCondition } from './utils';

const ValidatorOverview: React.FC<
    {
        status: StatusType;
        overview: OverviewType;
    } & ComponentDefault
> = ({ status, overview, className }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('validators');
    const { handleCopyToClipboard } = useAddress(t);

    const statusTheme = getValidatorStatus(status.status, status.jailed, status.tombstoned);
    const condition = getCondition(status.condition, status.status);

    const statusItems = [
        {
            key: (
                <Typography variant="h4" className="label">
                    {t('status')}
                </Typography>
            ),
            value: <Tag value={t(statusTheme.status)} theme={statusTheme.theme as any} className="statusTag" />
        },
        {
            key: (
                <Typography variant="h4" className="label">
                    {t('commission')}
                </Typography>
            ),
            value: (
                <Typography variant="body1" className="value">
                    {status.commission === null ? 'N/A' : `${numeral(status.commission * 100).format('0.[00]')}%`}
                </Typography>
            )
        },
        {
            key: (
                <Typography variant="h4" className="label condition">
                    {t('condition')}
                    <InfoPopover content={<ConditionExplanation />} />
                </Typography>
            ),
            value:
                status.status === 3 ? (
                    <div className="condition__body">
                        <InfoPopover
                            content={
                                <>
                                    <Typography variant="body1">
                                        {t('missedBlockCounter', {
                                            amount: numeral(status.missedBlockCounter).format('0,0')
                                        })}
                                    </Typography>
                                    <Typography variant="body1">
                                        {t('signedBlockWindow', {
                                            amount: numeral(status.signedBlockWindow).format('0,0')
                                        })}
                                    </Typography>
                                </>
                            }
                            display={
                                <Typography variant="body1" className={clsx('value', condition)}>
                                    {t(condition)}
                                </Typography>
                            }
                        />
                    </div>
                ) : (
                    <Typography variant="body1" className={clsx('value', 'condition', condition)}>
                        {t(condition)}
                    </Typography>
                )
        },
        {
            key: (
                <Typography variant="h4" className="label">
                    {t('maxRate')}
                </Typography>
            ),
            value: (
                <Typography variant="body1" className="value">
                    {Big(status.maxRate).times(100).toFixed(2)}%
                </Typography>
            )
        }
    ];

    return (
        <>
            <Box
                className={clsx(className)}
                sx={(theme) => ({
                    '& .addressRoot': {
                        [theme.breakpoints.up('md')]: { display: 'grid', gridTemplateColumns: 'repeat(2,1fr)' }
                    },
                    '& .item': {
                        padding: theme.spacing(2, 0),
                        color: theme.palette.custom.fonts.fontTwo,
                        '&:first-child': { paddingTop: 0 },
                        '&:last-child': { paddingBottom: 0 },
                        '&:not(:last-child)': { borderBottom: `solid 1px ${theme.palette.divider}` },
                        '& .label': { marginBottom: theme.spacing(1) },
                        '& a': { color: theme.palette.custom.fonts.highlight },
                        [theme.breakpoints.up('md')]: {
                            padding: 0,
                            '&:not(:last-child)': { borderBottom: 'none' },
                            '& .label': { marginBottom: 0 }
                        }
                    },
                    '& .copyText .detail': {
                        display: 'flex',
                        alignItems: 'center',
                        flexDirection: 'row-reverse',
                        justifyContent: 'flex-end',
                        '& svg': { width: '1rem', marginLeft: theme.spacing(1) }
                    },
                    '& .copyText .detail .value': {
                        textDecoration: 'none'
                    },
                    '& .copyText .detail a': {
                        textDecoration: 'none'
                    },
                    '& .addressRoot .item': {
                        borderBottom: 'none !important'
                    },
                    '& .actionIcon:hover': { cursor: 'pointer' },
                    '& .statusRoot': {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(1, 1fr)',
                        gap: theme.spacing(2),
                        [theme.breakpoints.up('md')]: { gridTemplateColumns: 'repeat(2, 1fr)' },
                        [theme.breakpoints.up('lg')]: { gridTemplateColumns: 'repeat(4, 1fr)' }
                    },
                    '& .statusItem .label': {
                        marginBottom: theme.spacing(1),
                        color: theme.palette.custom.fonts.fontThree,
                        '&.condition': { display: 'flex', alignItems: 'center' }
                    },
                    '& .statusItem .condition__body': { justifySelf: 'flex-start' },
                    '& .statusItem p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& .statusItem p.value.good': { color: theme.palette.custom.condition.one },
                    '& .statusItem p.value.moderate': { color: theme.palette.custom.condition.two },
                    '& .statusItem p.value.bad': { color: theme.palette.custom.condition.three },
                    '& .statusItem p.value.condition': { color: theme.palette.custom.condition.zero },
                    '& .statusTag .MuiTypography-body1': { lineHeight: 1 },
                    '& .divider': { margin: theme.spacing(3, 0) }
                })}
            >
                <div className="addressRoot">
                    <div className={clsx('copyText', 'item')}>
                        <Typography variant="body1" className="label">
                            {t('operatorAddress')}
                        </Typography>
                        <div className="detail">
                            <CopyIcon onClick={() => handleCopyToClipboard(overview.operatorAddress)} className="actionIcon" />
                            <Typography variant="body1" className="value">
                                {!isDesktop
                                    ? getMiddleEllipsis(overview.operatorAddress, {
                                          beginning: 15,
                                          ending: 5
                                      })
                                    : overview.operatorAddress}
                            </Typography>
                        </div>
                    </div>

                    <div className={clsx('copyText', 'item')}>
                        <Typography variant="body1" className="label">
                            {t('selfDelegateAddress')}
                        </Typography>
                        <div className="detail">
                            <CopyIcon className="actionIcon" onClick={() => handleCopyToClipboard(overview.selfDelegateAddress)} />
                            <Link to={ACCOUNT_DETAILS(overview.selfDelegateAddress)}>
                                <Typography variant="body1" className="value" component="a">
                                    {!isDesktop
                                        ? getMiddleEllipsis(overview.selfDelegateAddress, {
                                              beginning: 15,
                                              ending: 5
                                          })
                                        : overview.selfDelegateAddress}
                                </Typography>
                            </Link>
                        </div>
                    </div>
                </div>
                <Divider className="divider" />
                <div className="statusRoot">
                    {statusItems.map((x, i) => {
                        return (
                            <div className="statusItem" key={`status-item-${i}`}>
                                {x.key}
                                {x.value}
                            </div>
                        );
                    })}
                </div>
            </Box>
        </>
    );
};

export default ValidatorOverview;
