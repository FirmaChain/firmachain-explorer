import { Name } from '@components';
import { MsgDeleteProfile } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const DeleteProfile = (props: { message: MsgDeleteProfile }) => {
    const { message } = props;

    const creator = useProfileRecoil(message.creator);
    const creatorMoniker = creator ? creator?.name : message.creator;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txDeleteProfileContent"
                components={[<Name address={message.creator} name={creatorMoniker} />]}
            />
        </Typography>
    );
};

export default DeleteProfile;
