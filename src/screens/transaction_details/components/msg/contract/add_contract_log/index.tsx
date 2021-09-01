import React from 'react';
import { Name } from '@components';
import { MsgAddContractLog } from '@models';
import { useChainContext } from '@contexts';
import { useGetStyles } from './styles';

const AddContractLog = (props: {
  message: MsgAddContractLog;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

  const ownerAddress = findAddress(message.ownerAddress);
  const ownerMoniker = ownerAddress ? ownerAddress?.moniker : message.ownerAddress;

  const creatorAddress = findAddress(message.creatorAddress);
  const creatorMoniker = creatorAddress ? creatorAddress?.moniker : message.creatorAddress;

  const { classes } = useGetStyles();

  return (
    <pre className={classes.root}>
        <code>
            {"{\n"}
            {
                Object.keys(message.json).map((key,i) => {
                    if(key === "creator")
                        return (
                            <>{`\t"${key}" : "`}<Name address={message.creatorAddress} name={creatorMoniker}/>{`"\n`}</>
                        )
                    else if(key === "ownerAddress")
                        return (
                            <>{`\t"${key}" : "`}<Name address={message.ownerAddress} name={ownerMoniker}/>{`"\n`}</>
                        )
                    else
                        return `\t"${key}" : "${message.json[key]}"\n`;
                })
            }
            {"}"}
        </code>
    </pre>
  );
};

export default AddContractLog;
