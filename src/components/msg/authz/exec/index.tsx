import { Name } from '@components';
import { MsgExec } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const Exec = (props: { message: MsgExec }) => {
    const { message } = props;

    const grantee = useProfileRecoil(message.grantee);
    const granteeMoniker = grantee ? grantee?.name : message.grantee;

    return (
        <Typography>
            <Trans i18nKey="message_contents:MsgExec" components={[<Name address={message.grantee} name={granteeMoniker} />]} />
        </Typography>
    );
};

export default Exec;
