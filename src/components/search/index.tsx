import React from 'react';
import { Search as SearchIcon } from '@mui/icons-material';
import { Box, InputAdornment, InputBase } from '@mui/material';

import { useSearch } from './hooks';

const Search: React.FC<{
    className?: string;
    placeholder: string;
    callback: (value: string) => void;
}> = ({ className, placeholder, callback }) => {
    const { handleOnSubmit, handleOnChange, handleKeyDown, value } = useSearch(callback);
    return (
        <Box
            component="form"
            className={className}
            onSubmit={handleOnSubmit}
            sx={(theme: any) => ({
                '& .MuiInputBase-root': {
                    width: '100%',
                    background: theme.palette.background.paper,
                    padding: theme.spacing(0.4, 1.2),
                    borderRadius: `${theme.shape.borderRadius}px`
                },
                '& .MuiInputBase-input': {
                    textOverflow: 'ellipsis',
                    '&::placeholder': {
                        color: theme.palette.custom.fonts.fontFour
                    }
                }
            })}
        >
            <InputBase
                placeholder={placeholder}
                onChange={handleOnChange}
                onKeyDown={handleKeyDown}
                value={value}
                inputProps={{
                    'aria-label': placeholder
                }}
                startAdornment={
                    <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                    </InputAdornment>
                }
            />
        </Box>
    );
};

export default Search;
