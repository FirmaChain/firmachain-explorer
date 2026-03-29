import React from 'react';
import { Name } from '@components';
import { MsgAddContractLog } from '@models';
import { useTheme } from '@mui/material/styles';
import { useProfileRecoil } from '@recoil/profiles';

const AddContractLog = (props: { message: MsgAddContractLog }) => {
    const { message } = props;

    const creatorAddress = useProfileRecoil(message.creatorAddress);
    const creatorMoniker = creatorAddress ? creatorAddress?.name : message.creatorAddress;
    const theme = useTheme();

    return (
        <pre
            style={{
                overflow: 'auto',
                padding: '1rem',
                margin: '0',
                background: theme.palette.background.default,
                flex: 1
            }}
        >
            <code style={{ whiteSpace: 'pre-wrap' }}>
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
