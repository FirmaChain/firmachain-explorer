// /* eslint-disable */
import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import useTranslation from '@/adapters/i18n/useTranslation';
import Link from '@/adapters/routing/link';
import { generalConfig } from '@configs';
import { Typography } from '@mui/material';
import { HOME } from '@utils/go_to_page';

import { useStyles } from './styles';

const Error = () => {
    const classes = useStyles();
    const { t } = useTranslation();

    return (
        <div className={classes.root}>
            <div className="container">
                <Typography variant="h2">{t('common:errorTitle')}</Typography>
                <Typography className="details">
                    <Trans
                        i18nKey="common:errorDetails"
                        components={[
                            // eslint-disable-next-line
                            <a target="_blank" rel="noreferrer" href={generalConfig.github.reportIssue} />
                        ]}
                        values={{
                            issue: generalConfig.github.reportIssue
                        }}
                    />
                </Typography>
                <Link href={HOME} passHref>
                    <Typography component="a">{t('common:errorHome')}</Typography>
                </Link>
            </div>
        </div>
    );
};

export default Error;
