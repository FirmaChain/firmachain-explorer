import { Box } from '@components';
import { chainConfig } from '@configs';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import clsx from 'clsx';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

import PieChart from '@/components/pieGraph';

import { useTokenomics } from './hooks';

const Tokenomics = ({ className }: { className?: string }) => {
    const { t } = useTranslation('home');
    const theme = useTheme();
    const { state } = useTokenomics();

    const data = [
        {
            name: 'bonded',
            value: state.bonded,
            percent: `${numeral((state.bonded * 100) / state.total).format('0.00')}%`,
            color: theme.palette.custom.tokenomics.one
        },
        {
            name: 'unbonded',
            value: state.unbonded,
            percent: `${numeral((state.unbonded * 100) / state.total).format('0.00')}%`,
            color: theme.palette.custom.tokenomics.two
        },
        {
            name: 'unbonding',
            value: state.unbonding,
            percent: `${numeral((state.unbonding * 100) / state.total).format('0.00')}%`,
            color: theme.palette.custom.tokenomics.three
        }
    ];

    return (
        <Box
            className={clsx(className)}
            sx={{
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                flexDirection: 'column',
                '& .label': {
                    marginBottom: theme.spacing(2)
                },
                '& .data': {
                    display: 'flex',
                    '& .data__item': {
                        width: '50%',
                        whiteSpace: 'pre-wrap',
                        '& h4': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& .MuiTypography-caption': {
                            color: theme.palette.custom.fonts.fontThree
                        }
                    }
                },
                '& .content': {
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                },
                '& .legends': {
                    display: 'flex',
                    alignItems: 'flex-start',
                    justifyContent: 'flex-start',
                    flexWrap: 'wrap',
                    width: '100%',
                    '& .MuiTypography-caption': {
                        color: theme.palette.custom.fonts.fontThree
                    },
                    '& .legends__item': {
                        width: '50%',
                        '&:before': {
                            content: '""',
                            display: 'inline-block',
                            width: '12px',
                            height: '12px',
                            marginRight: '5px'
                        },
                        '&:first-child:before': {
                            background: theme.palette.custom.tokenomics.one
                        },
                        '&:nth-child(2):before': {
                            background: theme.palette.custom.tokenomics.two
                        },
                        '&:last-child:before': {
                            background: theme.palette.custom.tokenomics.three
                        },
                        '& .caption__percent': {
                            color: theme.palette.custom.fonts.fontThree
                        }
                    }
                }
            }}
        >
            <Typography variant="h2" className="label">
                {t('tokenomics')}
            </Typography>
            <div className="data">
                {data.slice(0, 2).map((x) => (
                    <div className="data__item" key={x.name}>
                        <Typography variant="h4">
                            {numeral(x.value).format('0,0')} {chainConfig.tokenUnits[state.denom]?.display?.toUpperCase()}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {t(x.name)}
                        </Typography>
                        <Typography variant="caption" component="p">
                            {x.percent}
                        </Typography>
                    </div>
                ))}
            </div>
            <div className="content">
                <PieChart data={data} type="semi-circle" size={200} />

                <div className="legends">
                    {data.map((x) => {
                        return (
                            <div className="legends__item" key={x.name}>
                                <Typography variant="caption">{t(x.name)}</Typography>
                            </div>
                        );
                    })}
                </div>
            </div>
        </Box>
    );
};

export default Tokenomics;
