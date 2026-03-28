import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import { Name } from '@components';
import { Typography } from '@mui/material';
import { MsgEditValidator } from '@models';
import { useProfileRecoil } from '@recoil/profiles';
import { VALIDATOR_DETAILS } from '@utils/go_to_page';

const EditValidator = (props: { message: MsgEditValidator }) => {
    const { message } = props;

    const validator = useProfileRecoil(message.validatorAddress);
    const validatorMoniker = validator ? validator?.name : message.validatorAddress;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txEditValidatorContent"
                components={[<Name address={message.validatorAddress} name={validatorMoniker} href={VALIDATOR_DETAILS} />]}
            />
        </Typography>
    );
};

export default EditValidator;
