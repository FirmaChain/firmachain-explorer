import { Name } from '@components';
import { MsgRevokeAllowance } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const RevokeAllowance = (props: { message: MsgRevokeAllowance }) => {
    const { message } = props;

    const granter = useProfileRecoil(message.granter);
    const granterMoniker = granter ? granter?.name : message.granter;

    const grantee = useProfileRecoil(message.grantee);
    const granteeMoniker = grantee ? grantee?.name : message.grantee;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:MsgRevokeAllowance"
                components={[
                    <Name address={message.granter} name={granterMoniker} />,
                    <Name address={message.grantee} name={granteeMoniker} />
                ]}
            />
        </Typography>
    );
};

export default RevokeAllowance;
