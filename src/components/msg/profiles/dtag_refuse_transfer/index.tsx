import React from 'react';
import { Name } from '@components';
import { MsgDtagRefuseTransfer } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const DtagRefuseTransfer = (props: { message: MsgDtagRefuseTransfer }) => {
    const { message } = props;

    const sender = useProfileRecoil(message.sender);
    const senderMoniker = sender ? sender?.name : message.sender;

    const receiver = useProfileRecoil(message.receiver);
    const receiverMoniker = receiver ? receiver?.name : message.receiver;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txRefuseDTagTransferContent"
                components={[
                    <Name address={message.sender} name={senderMoniker} />,
                    <Name address={message.receiver} name={receiverMoniker} />
                ]}
            />
        </Typography>
    );
};

export default DtagRefuseTransfer;
