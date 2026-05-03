import { Name } from '@components';
import { MsgEditValidator } from '@models';
import { Typography } from '@mui/material';
import { VALIDATOR_DETAILS } from '@utils/go_to_page';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

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
