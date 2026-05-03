import { Fragment } from 'react';
import { Markdown, Name } from '@components';
import { Typography } from '@mui/material';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { useProfileRecoil } from '@zustand/profiles';
import { readDate, useSettingsStore } from '@zustand/settings';
import { useTranslation } from 'react-i18next';

import type { OverviewType } from '../../../types';
import type { OverviewDisplayType } from '../utils';

type Props = {
    overview: OverviewType;
    overviewType: OverviewDisplayType;
    classes: Record<string, string>;
};

const DATE_FIELDS: {
    key: 'submitTime' | 'depositEndTime' | 'votingStartTime' | 'votingEndTime';
}[] = [{ key: 'submitTime' }, { key: 'depositEndTime' }, { key: 'votingStartTime' }, { key: 'votingEndTime' }];

const MetadataSection = ({ overview, overviewType, classes }: Props) => {
    const { t } = useTranslation('proposals');
    const dateFormat = useSettingsStore(readDate);
    const proposer = useProfileRecoil(overview.proposer);
    const proposerMoniker = proposer?.name ?? overview.proposer;

    return (
        <div className={classes.content}>
            <Typography variant="body1" className="label">
                {t('type')}
            </Typography>
            <Typography variant="body1" className="value">
                {t(overviewType)}
            </Typography>
            <Typography variant="body1" className="label">
                {t('proposer')}
            </Typography>
            <Name name={proposerMoniker} address={proposer.address} />
            {DATE_FIELDS.map(
                ({ key }) =>
                    overview[key] && (
                        <Fragment key={key}>
                            <Typography variant="body1" className="label">
                                {t(key)}
                            </Typography>
                            <Typography variant="body1" className="value">
                                {formatDayJs(dayjs.utc(overview[key]), dateFormat)}
                            </Typography>
                        </Fragment>
                    )
            )}
            <Typography variant="body1" className="label">
                {t('description')}
            </Typography>
            <Markdown markdown={overview.description} />
        </div>
    );
};

export default MetadataSection;
