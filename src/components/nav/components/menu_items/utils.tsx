import BlockIcon from '@assets/icon-block.svg?react';
import HomeIcon from '@assets/icon-home.svg?react';
import TransactionIcon from '@assets/icon-transaction.svg?react';
import ProposalsIcon from '@assets/icon-proposals.svg?react';
import UserIcon from '@assets/icon-user.svg?react';
import ParamIcon from '@assets/icon-param.svg?react';
import {
  HOME,
  BLOCKS,
  VALIDATORS,
  TRANSACTIONS,
  PROPOSALS,
  PARAMS,
} from '@utils/go_to_page';

export const getMenuItems = () => {
  const iconProps = {
    width: 24,
    height: 24,
  };

  return [
    {
      key: 'overview',
      url: HOME,
      icon: <HomeIcon {...iconProps} />,
    },
    {
      key: 'blocks',
      url: BLOCKS,
      icon: <BlockIcon {...iconProps} />,
    },
    {
      key: 'validators',
      url: VALIDATORS,
      icon: <UserIcon {...iconProps} />,
    },
    {
      key: 'transactions',
      url: TRANSACTIONS,
      icon: <TransactionIcon {...iconProps} />,
    },
    {
      key: 'proposals',
      url: PROPOSALS,
      icon: <ProposalsIcon {...iconProps} />,
    },
    {
      key: 'params',
      url: PARAMS,
      icon: <ParamIcon {...iconProps} />,
    },
  ];
};
