import React from 'react';
import { InputAdornment, InputBase } from '@material-ui/core';
import { Search as SearchIcon } from '@material-ui/icons';
import classnames from 'classnames';

import { useSearch } from './hooks';
import { useStyles } from './styles';

const Search: React.FC<{
    className?: string;
    placeholder: string;
    callback: (value: string) => void;
}> = ({ className, placeholder, callback }) => {
    const classes = useStyles();

    const { handleOnSubmit, handleOnChange, handleKeyDown, value } = useSearch(callback);
    return (
        <form className={classnames(className, classes.root)} onSubmit={handleOnSubmit}>
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
        </form>
    );
};

export default Search;
