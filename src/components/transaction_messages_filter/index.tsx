import React from 'react';
import FilterIcon from '@assets/icon-filter.svg?react';
import { Box, InputBase, MenuItem, Select, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { useTransactionsFilter } from './hooks';
import { getFilterLabels } from './utils';

const TransactionMessagesFilter: React.FC<{
    className?: string;
    callback: (value: string) => void;
}> = ({ className, callback }) => {
    const filterLabels = getFilterLabels();
    const { t } = useTranslation('transactions');
    const { handleSelect, selectedFilter } = useTransactionsFilter(callback);
    const renderFilterLabel = (value: string) => {
        const selected = filterLabels.find((item) => item.key === value);
        const label = value ? (selected ? t(selected.display) : '') : t('filterBy');
        return label?.trim() ? label : 'Empty';
    };

    return (
        <Select
            className={className}
            sx={(theme) => ({
                borderRadius: `${theme.shape.borderRadius}px`,
                background: theme.palette.custom.general.surfaceTwo,
                color: theme.palette.custom.fonts.fontThree,
                '&.MuiInputBase-root': {
                    height: '40px'
                },
                '& .MuiSelect-icon': {
                    color: theme.palette.custom.fonts.fontThree,
                    right: '6px'
                },
                '& .MuiSelect-select.MuiSelect-select': {
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    padding: '8px 32px 8px 16px',
                    color: theme.palette.custom.fonts.fontThree,
                    '& .MuiTypography-body1': {
                        marginRight: theme.spacing(2),
                        lineHeight: 1
                    }
                },
                [theme.breakpoints.up('lg')]: {
                    display: 'inline-flex',
                    minWidth: '190px'
                }
            })}
            displayEmpty
            MenuProps={{
                anchorOrigin: {
                    vertical: 'bottom',
                    horizontal: 'left'
                },
                transformOrigin: {
                    vertical: 'top',
                    horizontal: 'left'
                },
                PaperProps: {
                    elevation: 0,
                    sx: (theme) => ({
                        bgcolor: theme.palette.custom.general.surfaceOne,
                        backgroundImage: 'none',
                        boxShadow: 'none',
                        backdropFilter: 'none',
                        borderRadius: 0,
                        '& .MuiMenu-list': {
                            padding: '8px 14px 8px 0',
                            fontSize: '14px',
                            lineHeight: '20.02px'
                        }
                    })
                }
            }}
            value={selectedFilter}
            renderValue={(value) => (
                <Box
                    component="span"
                    sx={(theme) => ({
                        display: 'inline-flex',
                        alignItems: 'center',
                        verticalAlign: 'middle',
                        justifyContent: 'flex-start',
                        width: '100%',
                        color: theme.palette.custom.fonts.fontThree,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden'
                    })}
                >
                    <FilterIcon
                        aria-hidden="true"
                        style={{
                            display: 'block',
                            width: 16,
                            height: 16,
                            minWidth: 16,
                            marginRight: 8,
                            verticalAlign: 'middle'
                        }}
                    />
                    <Box
                        component="span"
                        sx={{
                            display: 'inline-block',
                            verticalAlign: 'middle',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}
                    >
                        {renderFilterLabel((value as string) ?? '')}
                    </Box>
                </Box>
            )}
            input={<InputBase />}
        >
            {filterLabels.map((x) => {
                return (
                    <MenuItem
                        key={x.key}
                        onClick={() => handleSelect(x)}
                        value={x.key}
                        sx={(theme) => ({
                            color: theme.palette.custom.fonts.fontThree,
                            fontSize: '1rem',
                            lineHeight: '24px',
                            minHeight: '36px',
                            px: 2,
                            py: '6px',
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.16)'
                            },
                            '&.Mui-selected': {
                                backgroundColor: 'rgba(255, 255, 255, 0.16)'
                            },
                            '&.Mui-selected:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.16)'
                            }
                        })}
                    >
                        <Typography variant="body1" noWrap>
                            {t(x.display)}
                        </Typography>
                    </MenuItem>
                );
            })}
        </Select>
    );
};

export default TransactionMessagesFilter;
