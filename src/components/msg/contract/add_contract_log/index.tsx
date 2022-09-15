import React from 'react';
import { Name } from '@components';
import { MsgAddContractLog } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import { useGetStyles } from './styles';

const AddContractLog = (props: { message: MsgAddContractLog }) => {
  const { message } = props;

  const ownerAddress = useProfileRecoil(message.ownerAddress);

  const creatorAddress = useProfileRecoil(message.creatorAddress);
  const creatorMoniker = creatorAddress ? creatorAddress?.name : message.creatorAddress;

  const { classes } = useGetStyles();

  return (
    <pre className={classes.root}>
      <code>
        {'{\n'}
        {Object.keys(message.json).map((key) => {
          let result;

          if (key === 'creator') {
            result = (
              <>
                {`\t"${key}" : "`}
                <Name address={message.creatorAddress} name={creatorMoniker} />
                {'"\n'}
              </>
            );
          } else {
            result = `\t"${key}" : "${message.json[key]}"\n`;
          }
          return result;
        })}
        {'}'}
      </code>
    </pre>
  );
};

export default AddContractLog;
