import BigDipperLogoRed from '@assets/big-dipper-red.svg?react';
import BigDipperLogoWhite from '@assets/big-dipper-white.svg?react';
import { ExpandMore } from '@mui/icons-material';
import { Box } from '@mui/material';
import { HOME } from '@utils/go_to_page';
import { readSelectedNetwork, useBigDipperNetworksStore } from '@zustand/big_dipper_networks';
import { readTheme, useSettingsStore } from '@zustand/settings';
import classnames from 'classnames';
import { Link } from 'react-router';

import { NavbarProps } from './types';

const Navbar = (props: NavbarProps) => {
    const theme = useSettingsStore(readTheme);
    const selected = useBigDipperNetworksStore(readSelectedNetwork);
    const { isOpen, openNetwork, toggleNavMenus } = props;

    return (
        <Box
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'flex-start',
                justifyContent: 'space-between',
                p: theme.spacing(3, 2, 0),
                '& .logo-link': {
                    lineHeight: 0,
                    zIndex: 200
                },
                '& .logo': {
                    width: '120px',
                    '&:hover': {
                        cursor: 'pointer'
                    }
                },
                '& .actions': {
                    display: 'flex',
                    alignItems: 'center',
                    minWidth: 0
                },
                '& .network': {
                    zIndex: 150,
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    margin: '0 0.3rem 0 0.7rem',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    '& .text': {
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                    }
                },
                '& .hamburger': {
                    zIndex: 200,
                    width: '20px',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    '&:before, &:after, & .hamburger-content': {
                        content: '""',
                        backgroundColor: theme.palette?.custom.general.icon,
                        borderRadius: '10px',
                        display: 'block',
                        height: '2px',
                        margin: '4px 0',
                        transition: 'all 0.4s ease-in-out'
                    }
                },
                '& .hamburger.active:before': {
                    transform: 'translateY(7px) rotate(137deg)'
                },
                '& .hamburger.active:after': {
                    transform: 'translateY(-5px) rotate(-140deg)'
                },
                '& .hamburger.active .hamburger-content': {
                    transform: 'scale(0)'
                }
            })}
        >
            <Link to={HOME} className="logo-link">
                {theme === 'light' ? <BigDipperLogoRed className="logo" /> : <BigDipperLogoWhite className="logo" />}
            </Link>
            <div className="actions">
                {/* =================================== */}
                {/* Network */}
                {/* =================================== */}
                <div className="network" onClick={openNetwork} role="button">
                    <p className="text">{selected}</p>
                    <ExpandMore fontSize="small" />
                </div>
                {/* =================================== */}
                {/* Hamburger */}
                {/* =================================== */}
                <div
                    role="button"
                    onClick={toggleNavMenus}
                    className={classnames('hamburger', {
                        active: isOpen
                    })}
                >
                    <div className="hamburger-content" />
                </div>
            </div>
        </Box>
    );
};

export default Navbar;
