import React from 'react';
import NextFastIcon from '@assets/icon-next-fast.svg?react';
import NextIcon from '@assets/icon-next.svg?react';
import { Box, FormControl, IconButton, InputBase, MenuItem, Select, Typography } from '@mui/material';
import classnames from 'classnames';

import { useTablePaginationActions } from './hooks';

const ACTION_BUTTON_SIZE = '30px';
const MENU_ITEM_BG = 'rgba(255, 255, 255, 0.16)';

/**
 * custom pagination buttons
 * @param props
 */
const Actions: React.FC<{
    className?: string;
    backIconButtonProps?: any;
    count: number;
    nextIconButtonProps?: any;
    onPageChange: (event: React.MouseEvent<HTMLButtonElement> | null, page: number) => void;
    handleChangeRowsPerPage: (selectedRowsPerPage: number) => void;
    page: number;
    rowsPerPage: number;
    pageNeighbors?: 1 | 2;
    rowsPerPageOptions?: number[];
}> = (props) => {
    const { count, page, rowsPerPage, onPageChange, className, rowsPerPageOptions } = props;

    const { handleFirstPage, handleNextPage, handlePreviousPage, handleLastPage, availablePages, handleRowOptionChange } =
        useTablePaginationActions(props);

    const disablePrevious = page === 0;
    const disableNext = page >= Math.ceil(count / rowsPerPage) - 1;

    return (
        <Box
            component="ul"
            className={classnames(className)}
            sx={(theme) => ({
                display: 'flex',
                alignItems: 'center',
                m: 0,
                listStyleType: 'none',
                '& .MuiIconButton-root, & .MuiInputBase-input': {
                    background: theme.palette.custom.general.surfaceTwo
                },
                '& li': {
                    margin: theme.spacing(0, 0.5),
                    '&.last': {
                        marginRight: 0,
                        marginLeft: '3px'
                    },
                    '&.first': {
                        marginLeft: 0,
                        marginRight: '3px'
                    }
                },
                '& .action-button': {
                    height: ACTION_BUTTON_SIZE,
                    width: ACTION_BUTTON_SIZE,
                    borderRadius: `${theme.shape.borderRadius}px`,
                    p: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                },
                '& .page-button': {
                    color: theme.palette.custom.fonts.fontThree,
                    '&.selected': {
                        color: theme.palette.primary.contrastText,
                        background: theme.palette.primary.main,
                        '&:hover': {
                            cursor: 'initial'
                        }
                    },
                    '&:hover': {
                        cursor: 'pointer'
                    }
                },
                '& .prev': {
                    transform: 'rotate(180deg)'
                },
                '& .rowSelection .MuiInputBase-input': {
                    p: 0
                },
                '& .rowSelection .MuiTypography-body2': {
                    color: theme.palette.custom.fonts.fontThree
                },
                '& .rowSelection .MuiSelect-selectMenu': {
                    height: ACTION_BUTTON_SIZE,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: `${theme.shape.borderRadius}px`,
                    paddingLeft: theme.spacing(1),
                    paddingRight: theme.spacing(3)
                },
                '& .menuItem .MuiTypography-body2': {
                    color: theme.palette.custom.fonts.fontThree
                },
                '& .menuItem.Mui-selected': {
                    backgroundColor: MENU_ITEM_BG
                },
                '& .menuItem.Mui-selected:hover': {
                    backgroundColor: MENU_ITEM_BG
                },
                '& .tablet': {
                    display: 'none',
                    [theme.breakpoints.up('md')]: {
                        display: 'inline-block'
                    }
                },
                [theme.breakpoints.up('md')]: {
                    alignSelf: 'flex-end'
                }
            })}
        >
            <li className="first">
                <IconButton
                    className="action-button"
                    disableRipple
                    onClick={handleFirstPage}
                    disabled={disablePrevious}
                    aria-label="first page"
                >
                    <NextFastIcon className="prev" />
                </IconButton>
            </li>
            <li>
                <IconButton
                    disableRipple
                    className="action-button"
                    onClick={handlePreviousPage}
                    disabled={disablePrevious}
                    aria-label="previous page"
                >
                    <NextIcon className="prev" />
                </IconButton>
            </li>
            {availablePages.map((x) => (
                <Typography
                    component="li"
                    variant="body2"
                    key={x}
                    onClick={() => onPageChange(null, x)}
                    className={classnames('action-button', 'page-button', {
                        selected: page === x
                    })}
                >
                    {x + 1}
                </Typography>
            ))}
            <li>
                <IconButton disableRipple className="action-button" onClick={handleNextPage} disabled={disableNext} aria-label="next page">
                    <NextIcon />
                </IconButton>
            </li>
            <li className="last">
                <IconButton disableRipple className="action-button" onClick={handleLastPage} disabled={disableNext} aria-label="last page">
                    <NextFastIcon />
                </IconButton>
            </li>
            {!!rowsPerPageOptions && (
                <li className="tablet">
                    <FormControl>
                        <Select className="rowSelection" value={rowsPerPage} onChange={handleRowOptionChange} input={<InputBase />}>
                            {rowsPerPageOptions.map((x) => {
                                return (
                                    <MenuItem value={x} key={x} className="menuItem">
                                        <Typography variant="body2">{x}</Typography>
                                    </MenuItem>
                                );
                            })}
                        </Select>
                    </FormControl>
                </li>
            )}
        </Box>
    );
};

export default Actions;
