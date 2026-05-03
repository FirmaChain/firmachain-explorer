import { chainConfig, generalConfig } from '@/configs';
import FirmachainTitle from '@assets/firma_chain_title.svg?react';
import { Box, Divider, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { readTheme, useSettingsStore } from '@zustand/settings';
import { Trans, useTranslation } from 'react-i18next';

import SocialMedia from './social_media';
import { footerLinks } from './utils';

const Footer = ({ className }: { className?: string }) => {
    const { t } = useTranslation();
    const theme = useSettingsStore(readTheme);

    // ============================
    // Footer
    // ============================
    const year = new Date().getFullYear();

    return (
        <Box
            className={className}
            sx={(muiTheme) => ({
                background: muiTheme.palette.background.paper,
                padding: muiTheme.spacing(6, 3, 6),
                color: muiTheme.palette.custom.fonts.fontOne,
                '& .footer__closing--container a': {
                    color: muiTheme.palette.custom.fonts.highlight
                },
                '& .MuiDivider-root': {
                    margin: muiTheme.spacing(4, 0)
                },
                '& p': {
                    marginTop: muiTheme.spacing(2),
                    marginBottom: muiTheme.spacing(2)
                },
                '& .footer__logo--container p': {
                    marginTop: muiTheme.spacing(1),
                    marginBottom: 0
                },
                '& .footer__logo': {
                    width: '180px'
                },
                '& .footer__closing--text': {
                    color: muiTheme.palette.custom.fonts.fontThree
                },
                '& .footer__links': {
                    marginTop: '1rem'
                },
                '& h3': {
                    color: muiTheme.palette.custom.fonts.fontThree,
                    fontWeight: 500,
                    marginBottom: muiTheme.spacing(2),
                    marginTop: muiTheme.spacing(2)
                },
                '& .links__group': {
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    '& a': {
                        margin: '0.5rem 0',
                        color: 'inherit',
                        textDecoration: 'none',
                        paddingBottom: { xs: '1rem', lg: 0 },
                        borderBottom: {
                            xs: `solid 1px ${muiTheme.palette.custom.fonts.fontFour}`,
                            lg: 'none'
                        },
                        transition: '0.2s',
                        width: { xs: '100%', lg: 'auto' },
                        '&:hover': {
                            color: alpha(muiTheme.palette.custom.fonts.fontOne, 0.6)
                        }
                    },
                    '&.forbole a:last-child': {
                        paddingBottom: '0',
                        borderBottom: 'none'
                    },
                    '&.media': {
                        display: 'none'
                    },
                    [muiTheme.breakpoints.up('lg')]: {
                        '& a': {
                            borderBottom: 'none',
                            padding: 0,
                            width: 'auto'
                        },
                        '&.media': {
                            display: 'grid'
                        }
                    }
                },
                [muiTheme.breakpoints.up('md')]: {
                    paddingBottom: 0,
                    '& .MuiDivider-root': {
                        marginBottom: 0
                    },
                    '& .footer__closing--container': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: muiTheme.spacing(1, 0)
                    }
                },
                [muiTheme.breakpoints.up('lg')]: {
                    '& .MuiDivider-root': {
                        marginTop: muiTheme.spacing(5)
                    },
                    '& .footer': {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(4, 1fr)'
                    },
                    '& .footer__links': {
                        gridColumn: '2/5',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                        marginTop: 0
                    },
                    '& .links__group.media': {
                        display: 'grid'
                    },
                    '& h3': {
                        fontSize: '1.125rem',
                        marginTop: 0
                    },
                    '& .footer__social': {
                        justifyContent: 'flex-end'
                    }
                }
            })}
        >
            <div className="footer">
                {/* ============================= */}
                {/* logo */}
                {/* ============================= */}
                <div className="footer__logo--container">
                    <FirmachainTitle style={{ fill: theme === 'light' ? 'black' : 'white', width: '180px' }} />
                    <p className="footer__slogan">{chainConfig.title}</p>
                </div>
                {/* ============================= */}
                {/* links */}
                {/* ============================= */}
                <div className="footer__links">
                    {footerLinks.map((group) => {
                        return (
                            <div key={group.key} className={`${group.key} links__group`}>
                                <h3>{t(`common:${group.key}`)}</h3>
                                {group.links.map((x) => {
                                    return (
                                        <a key={x.url} href={x.url} target="_blank" rel="noreferrer">
                                            {t(`common:${x.key}`)}
                                        </a>
                                    );
                                })}
                            </div>
                        );
                    })}
                    {/* ============================= */}
                    {/* social */}
                    {/* ============================= */}
                    <div className="footer__social">
                        <h3>{t('common:community')}</h3>
                        <SocialMedia />
                    </div>
                </div>
            </div>
            <Divider />
            <div className="footer__closing--container">
                <Typography className="footer__closing--text">
                    {/* ============================= */}
                    {/*
            WARNING: WE ARE USING APACHE 2.0 LICENSE
            DO YOUR RESEARCH BEFORE TRYING TO REMOVE/ EDIT THE FOLLOWING LINE(S)
            RESPECT OPEN SOURCE!!
          */}
                    {/* ============================= */}
                    <Trans
                        i18nKey="common:copyright"
                        components={[
                            <a
                                target="_blank"
                                rel="noreferrer"
                                href="https://raw.githubusercontent.com/forbole/big-dipper-2.0-cosmos/master/LICENSE"
                            />
                        ]}
                        values={{
                            name: generalConfig.maintainer.name
                        }}
                    />{' '}
                    {year}
                </Typography>
                <Typography className="footer__closing--text">
                    <Trans
                        i18nKey="common:maintainBy"
                        components={[<a target="_blank" rel="noreferrer" href={generalConfig.maintainer.url} />]}
                        values={{
                            name: generalConfig.maintainer.name
                        }}
                    />
                </Typography>
            </div>
        </Box>
    );
};

export default Footer;
