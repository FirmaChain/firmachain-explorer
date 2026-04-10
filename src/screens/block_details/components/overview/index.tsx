import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { AvatarName, BoxDetails } from '@components';
import { Typography } from '@mui/material';
import { useProfileRecoil } from '@zustand/profiles';
import { useSettingsStore,  readDate  } from '@zustand/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import numeral from 'numeral';

import { OverviewType } from '../../types';

const Overview: React.FC<OverviewType & ComponentDefault> = (props, { className }) => {
    const proposer = useProfileRecoil(props.proposer);
    const { t } = useTranslation('blocks');
    const dateFormat = useSettingsStore(readDate);

    return (
        <BoxDetails
            className={className}
            title={t('overview')}
            details={[
                {
                    label: t('height'),
                    detail: (
                        <Typography variant="body1" className="value">
                            {numeral(props.height).format('0,0')}
                        </Typography>
                    )
                },
                {
                    label: t('hash'),
                    detail: props.hash
                },
                {
                    label: t('proposer'),
                    detail: <AvatarName address={props.proposer} imageUrl={proposer.imageUrl} name={proposer.name} />
                },
                {
                    label: t('time'),
                    detail: formatDayJs(dayjs.utc(props.timestamp), dateFormat)
                },
                {
                    label: t('txs'),
                    detail: numeral(props.txs).format('0,0')
                }
            ]}
        />
    );
};

export default Overview;
