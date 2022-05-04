import React from 'react';
import {
  Typography,
} from '@material-ui/core';
import {
  InfoPopover, ConditionExplanation, Tag,
} from '@components';

export const fetchColumns = (t): {
  key: string;
  align?: 'left' | 'center' | 'right' | 'justify' | 'inherit';
  width: number;
  component?: React.ReactNode;
  sortKey?: string;
  sort?: boolean;
}[] => {
  return ([
    {
      key: 'idx',
      width: 5,
    },
    {
      key: 'validator',
      sortKey: 'validator.name',
      width: 20 + 5,
      sort: true,
    },
    {
      key: 'votingPower',
      sortKey: 'votingPower',
      width: 20 + 25 - 10 - 5,
      sort: true,
    },
    {
      key: 'commission',
      sortKey: 'commission',
      align: 'right',
      width: 15,
      sort: true,
    },
    {
      key: 'condition',
      align: 'center',
      width: 14,
      component: (
        <Typography variant="h4" className="label popover">
          {t('condition')}
          <InfoPopover
            content={<ConditionExplanation />}
          />
        </Typography>
      ),
    },
    {
      key: 'status',
      align: 'center',
      width: 10,
      sort: false,
    },
  ]);
};
