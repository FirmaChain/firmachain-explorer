import React from 'react';
import { Name } from '@components';
import { MsgSaveProfile } from '@models';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { Trans } from 'react-i18next';

const SaveProfile = (props: { message: MsgSaveProfile }) => {
    const { message } = props;

    const creator = useProfileRecoil(message.creator);
    const creatorMoniker = creator ? creator?.name : message.creator;

    return (
        <Typography>
            <Trans
                i18nKey="message_contents:txSaveProfileContent"
                components={[<Name address={message.creator} name={creatorMoniker} />]}
            />
        </Typography>
    );
};

export default SaveProfile;
