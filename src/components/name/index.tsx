import React from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { Typography } from '@material-ui/core';
import { ibcConfig } from '@src/configs';
import { ADDRESS_DETAILS } from '@utils/go_to_page';
import { useStyles } from './styles';

const Name: React.FC<{
  className?: string;
  address: string;
  name: string;
  href?: (address: string) => string;
}> = ({
  className, address, name, href = ADDRESS_DETAILS,
}) => {
  const classes = useStyles();

  const getExplorerUrlForAddress = (addressIn: string): string | null => {
    const configEntry = Object.entries(ibcConfig).find(
      ([_, config]) => config.display && addressIn.startsWith(config.display),
    );
    return configEntry ? configEntry[1].explorer : null;
  };

  const explorerUrl = getExplorerUrlForAddress(address);

  return (
    <Link href={explorerUrl ? `${explorerUrl}/${address}` : href(address)} passHref>
      <Typography variant="body1" className={classnames(className, classes.root)} component="a" target={explorerUrl ? '_blank' : ''}>
        {name}
      </Typography>
    </Link>
  );
};

export default Name;
