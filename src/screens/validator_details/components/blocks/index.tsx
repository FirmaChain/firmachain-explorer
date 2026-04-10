import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName, Box, Result } from '@components';
import { Box as MuiBox, Tooltip, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { useProfilesRecoil } from '@zustand/profiles';
import classnames from 'classnames';
import numeral from 'numeral';

import { useBlocks } from './hooks';

const Blocks: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { t } = useTranslation('validators');
    const { state } = useBlocks();
    const dataProfiles = useProfilesRecoil(state.map((x) => x.proposer));
    const mergedDataWithProfiles = state.map((x, i) => {
        return {
            ...x,
            proposer: dataProfiles[i]
        };
    });

    return (
        <Box
            className={classnames(className)}
            sx={(theme) => ({
                height: '100%',
                '& .MuiTypography-h2': {
                    mb: 2
                },
                '& .blocks': {
                    display: 'flex',
                    flexWrap: 'wrap',
                    m: -0.25
                },
                '& .singleBlock': {
                    width: '28px',
                    height: '28px',
                    borderRadius: '2px',
                    background: theme.palette.custom.general.surfaceTwo,
                    m: 0.25
                },
                '& .singleBlock:hover': {
                    background: alpha(theme.palette.custom.tags.zero, 0.5)
                },
                '& .singleBlock.signed': {
                    background: theme.palette.primary.main
                },
                '& .singleBlock.signed:hover': {
                    background: alpha(theme.palette.primary.main, 0.5)
                },
                '& .item': {
                    mb: 2,
                    '& .label': {
                        mb: 1,
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& p.value': {
                        color: theme.palette.custom.fonts.fontTwo
                    },
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    }
                },
                [theme.breakpoints.up('md')]: {
                    '& .singleBlock': {
                        width: '32px',
                        height: '32px'
                    }
                },
                [theme.breakpoints.up('lg')]: {
                    '& .singleBlock': {
                        width: '25px',
                        height: '25px'
                    }
                }
            })}
        >
            <Typography variant="h2">{t('lastBlocks')}</Typography>
            <div className="blocks">
                {mergedDataWithProfiles.map((x, i) => {
                    return (
                        <Tooltip
                            key={`blocks-tooltip-${i}`}
                            enterTouchDelay={50}
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        background: 'transparent',
                                        p: 0,
                                        m: 0,
                                        maxWidth: 'none'
                                    }
                                }
                            }}
                            title={
                                <MuiBox
                                    sx={(theme) => ({
                                        p: '1rem',
                                        minWidth: '220px',
                                        borderRadius: `${theme.shape.borderRadius}px`,
                                        backgroundColor: theme.palette.background.paper,
                                        backgroundImage: 'none',
                                        border: 'none',
                                        boxShadow:
                                            '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)',
                                        '& .item': {
                                            mb: 2,
                                            '&:last-of-type': {
                                                mb: 0
                                            },
                                            '& .label': {
                                                mb: 0.5,
                                                color: theme.palette.custom.fonts.fontThree
                                            },
                                            '& p.value': {
                                                color: theme.palette.custom.fonts.fontTwo
                                            },
                                            '& a': {
                                                color: theme.palette.custom.fonts.highlight
                                            }
                                        }
                                    })}
                                >
                                    <div className="item">
                                        <Typography variant="h4" className="label">
                                            {t('proposer')}
                                        </Typography>
                                        <AvatarName address={x.proposer.address} imageUrl={x.proposer.imageUrl} name={x.proposer.name} />
                                    </div>
                                    <div className="item">
                                        <Typography variant="h4" className="label">
                                            {t('block')}
                                        </Typography>
                                        <Typography variant="body1" className="value">
                                            {numeral(x.height).format('0,0')}
                                        </Typography>
                                    </div>
                                    <div className="item">
                                        <Typography variant="h4" className="label">
                                            {t('txs')}
                                        </Typography>
                                        <Typography variant="body1" className="value">
                                            {numeral(x.txs).format('0,0')}
                                        </Typography>
                                    </div>
                                    <div className="item">
                                        <Typography variant="h4" className="label">
                                            {t('signed')}
                                        </Typography>
                                        <Result success={x.signed} />
                                    </div>
                                </MuiBox>
                            }
                            placement="top"
                        >
                            <div
                                key={i}
                                className={classnames('singleBlock', {
                                    signed: state[i].signed
                                })}
                            />
                        </Tooltip>
                    );
                })}
            </div>
        </Box>
    );
};

export default Blocks;
