import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { locales } from '@/i18n';
import SettingIcon from '@assets/icon-setting.svg?react';
import { generalConfig } from '@configs';
import { Close as CloseIcon } from '@mui/icons-material';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, MenuItem, Select, Typography } from '@mui/material';
import { DATE_LIST, THEME_LIST, TX_LIST } from '@zustand/settings';
import classnames from 'classnames';

import { useSettingList } from './hooks';

const Settings: React.FC<{
    className?: string;
}> = (props) => {
    const { t, lang } = useTranslation('common');
    const { open, handleOpen, state, handleChange, handleFormSubmit, handleCancel } = useSettingList({ lang });

    return (
        <Box>
            <Box
                onClick={handleOpen}
                role="button"
                className={classnames(props.className)}
                sx={(theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                        cursor: 'pointer'
                    },
                    '& svg': {
                        fill: theme.palette.custom.general.icon,
                        '& path': {
                            fill: theme.palette.custom.general.icon
                        }
                    }
                })}
            >
                <SettingIcon />
            </Box>
            <Dialog maxWidth="md" onClose={handleCancel} open={open} sx={{ '& .MuiDialog-paper': { width: '500px' } }}>
                <DialogTitle
                    disableTypography
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        '& .MuiIconButton-root': {
                            p: 0
                        }
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Typography variant="h2">{t('settings')}</Typography>
                        <Typography variant="body2" sx={(theme) => ({ color: theme.palette.custom.fonts.fontFour, ml: 1 })}>
                            ({generalConfig.version})
                        </Typography>
                    </div>
                    <IconButton aria-label="close" onClick={handleCancel}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent dividers>
                    <form onSubmit={handleFormSubmit}>
                        <Box
                            sx={(theme) => ({
                                mb: 2,
                                '& .MuiOutlinedInput-root': { width: '100%' },
                                '& .form-item--label': { mb: 1 }
                            })}
                        >
                            <Typography className="form-item--label">{t('theme')}</Typography>
                            <Select
                                variant="outlined"
                                value={state.theme}
                                onChange={(e) => handleChange('theme', e?.target?.value)}
                                MenuProps={{
                                    MenuListProps: {
                                        disablePadding: true
                                    }
                                }}
                            >
                                {THEME_LIST.map((l) => (
                                    <MenuItem key={l} value={l}>
                                        {t(l)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box
                            sx={(theme) => ({
                                mb: 2,
                                '& .MuiOutlinedInput-root': { width: '100%' },
                                '& .form-item--label': { mb: 1 }
                            })}
                        >
                            <Typography className="form-item--label">{t('language')}</Typography>
                            <Select
                                variant="outlined"
                                value={state.lang}
                                onChange={(e) => handleChange('lang', e?.target?.value)}
                                MenuProps={{
                                    MenuListProps: {
                                        disablePadding: true
                                    }
                                }}
                            >
                                {locales.map((l) => (
                                    <MenuItem key={l} value={l}>
                                        {t(l)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box
                            sx={(theme) => ({
                                mb: 2,
                                '& .MuiOutlinedInput-root': { width: '100%' },
                                '& .form-item--label': { mb: 1 }
                            })}
                        >
                            <Typography className="form-item--label">{t('dateFormat')}</Typography>
                            <Select
                                variant="outlined"
                                value={state.dateFormat}
                                onChange={(e) => handleChange('dateFormat', e?.target?.value)}
                                MenuProps={{
                                    MenuListProps: {
                                        disablePadding: true
                                    }
                                }}
                            >
                                {DATE_LIST.map((l) => (
                                    <MenuItem key={l} value={l}>
                                        {t(l)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>

                        <Box
                            sx={(theme) => ({
                                mb: 2,
                                '& .MuiOutlinedInput-root': { width: '100%' },
                                '& .form-item--label': { mb: 1 }
                            })}
                        >
                            <Typography className="form-item--label">{t('txListFormat')}</Typography>
                            <Select
                                variant="outlined"
                                value={state.txListFormat}
                                onChange={(e) => handleChange('txListFormat', e?.target?.value)}
                                MenuProps={{
                                    MenuListProps: {
                                        disablePadding: true
                                    }
                                }}
                            >
                                {TX_LIST.map((l) => (
                                    <MenuItem key={l} value={l}>
                                        {t(l)}
                                    </MenuItem>
                                ))}
                            </Select>
                        </Box>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleFormSubmit} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default Settings;
