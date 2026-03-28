import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import FilterIcon from '@assets/icon-filter.svg?react';
import { InputBase, MenuItem, Select, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import classnames from 'classnames';

import { useTransactionsFilter } from './hooks';
import { useStyles } from './styles';
import { getFilterLabels } from './utils';

const TransactionMessagesFilter: React.FC<{
    className?: string;
    callback: (value: string) => void;
}> = ({ className, callback }) => {
    const filterLabels = getFilterLabels();
    const { t } = useTranslation('transactions');
    const classes = useStyles();
    const { handleSelect, selectedFilter } = useTransactionsFilter(callback);

    return (
        <Select
            IconComponent={ExpandMoreIcon}
            className={classnames(classes.select, className)}
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
                getContentAnchorEl: null
            }}
            value={selectedFilter}
            renderValue={
                selectedFilter !== ''
                    ? undefined
                    : () => {
                          return (
                              <Typography variant="body1" noWrap component="div" className={classes.filterLabel}>
                                  <FilterIcon className={classes.filterIcon} />
                                  {t('filterBy')}
                              </Typography>
                          );
                      }
            }
            input={<InputBase />}
        >
            {filterLabels.map((x) => {
                return (
                    <MenuItem key={x.key} onClick={() => handleSelect(x)} value={x.key} className={classes.item}>
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
