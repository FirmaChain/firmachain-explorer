import React from 'react';
import { Name } from '@components';
import { MsgCreateContractFile } from '@models';
import { useChainContext } from '@contexts';
import { useGetStyles } from './styles';

const CreateContrMsgCreateContractFile = (props: {
  message: MsgCreateContractFile;
}) => {
  const { findAddress } = useChainContext();
  const { message } = props;

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
                    else
                        return `\t"${key}" : "${message.json[key]}"\n`;
                })
            }
            {"}"}
        </code>
    </pre>
  );
};

export default CreateContrMsgCreateContractFile;
