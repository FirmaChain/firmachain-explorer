import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgCreateValidator } from '@models';
import { useProfileRecoil } from '@zustand/profiles';

const CreateValidator = (props: { message: MsgCreateValidator }) => {
    const { message } = props;

    const delegator = useProfileRecoil(message.delegatorAddress);
    const delegatorMoniker = delegator ? delegator?.name : message.delegatorAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txCreateValidatorContent"
                components={[
                    <Name address={message.delegatorAddress} name={delegatorMoniker} />,
                    <Name address={message.validatorAddress} name={message?.description?.moniker || message.validatorAddress} />
                ]}
            />
        </Typography>
    );
};

export default CreateValidator;
