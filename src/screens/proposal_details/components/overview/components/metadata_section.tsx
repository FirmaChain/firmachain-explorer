import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Markdown, Name } from '@components';
import { Typography } from '@material-ui/core';
import { useProfileRecoil } from '@recoil/profiles';
import { readDate } from '@recoil/settings';
import dayjs, { formatDayJs } from '@utils/dayjs';
import { useRecoilValue } from 'recoil';

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

const MetadataSection: React.FC<Props> = ({ overview, overviewType, classes }) => {
    const { t } = useTranslation('proposals');
    const dateFormat = useRecoilValue(readDate);
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
                        <React.Fragment key={key}>
                            <Typography variant="body1" className="label">
                                {t(key)}
                            </Typography>
                            <Typography variant="body1" className="value">
                                {formatDayJs(dayjs.utc(overview[key]), dateFormat)}
                            </Typography>
                        </React.Fragment>
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
