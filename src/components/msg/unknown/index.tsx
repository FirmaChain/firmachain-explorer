import React from 'react';
import { MsgUnknown } from '@models';
import { useTheme } from '@mui/material/styles';

const Unknown = (props: { message: MsgUnknown }) => {
    const { message } = props;
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
            <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(message.json, null, '\t')}</code>
        </pre>
    );
};

export default Unknown;
