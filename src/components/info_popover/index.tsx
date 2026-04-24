import React from 'react';
import HelpOutlineIcon from '@assets/icon-help-outline.svg?react';
import { Box, Popover } from '@mui/material';
import clsx from 'clsx';

import { useInfoPopover } from './hooks';

const InfoPopover: React.FC<{
    className?: string;
    content?: string | React.ReactNode;
    display?: string | React.ReactNode;
}> = ({ className, content, display }) => {
    const { handlePopoverOpen, handlePopoverClose, anchorEl, open } = useInfoPopover();

    return (
        <>
            <Box
                component="span"
                aria-owns={open ? 'mouse-over-popover' : undefined}
                aria-haspopup="true"
                onMouseEnter={handlePopoverOpen}
                onMouseLeave={handlePopoverClose}
                sx={{ display: 'flex', alignItems: 'center' }}
            >
                {display || (
                    <HelpOutlineIcon
                        className={clsx(className)}
                        style={{ display: 'inline-block', width: '1rem', marginLeft: '0.5rem', marginRight: '0.5rem' }}
                    />
                )}
            </Box>
            <Popover
                id="mouse-over-popover"
                open={open}
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center'
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center'
                }}
                onClose={handlePopoverClose}
                disableRestoreFocus
                sx={(theme) => ({
                    pointerEvents: 'none',
                    '& .MuiPopover-paper': {
                        p: '1rem',
                        maxWidth: '300px',
                        backgroundColor: theme.palette.background.paper,
                        backgroundImage: 'none',
                        border: 'none',
                        boxShadow:
                            '0px 5px 5px -3px rgba(0, 0, 0, 0.2), 0px 8px 10px 1px rgba(0, 0, 0, 0.14), 0px 3px 14px 2px rgba(0, 0, 0, 0.12)'
                    }
                })}
            >
                <>{content}</>
            </Popover>
        </>
    );
};

export default InfoPopover;
