import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import dynamic from '@/adapters/routing/dynamic';
import Link from '@/adapters/routing/link';
import { Box, NoData } from '@components';
import { useScreenSize } from '@hooks';
import { Divider, Typography } from '@material-ui/core';
import { useProfilesRecoil } from '@recoil/profiles';
import { BLOCKS } from '@utils/go_to_page';
import classnames from 'classnames';

import { useBlocks } from './hooks';
import { useStyles } from './styles';

const Desktop = dynamic(() => import('./components/desktop'));
const Mobile = dynamic(() => import('./components/mobile'));

const Blocks: React.FC<{
    className?: string;
}> = ({ className }) => {
    const { isDesktop } = useScreenSize();
    const { t } = useTranslation('home');
    const classes = useStyles();
    const { state } = useBlocks();

    const proposerProfiles = useProfilesRecoil(state.items.map((x) => x.proposer));
    const mergedDataWithProfiles = state.items.map((x, i) => {
        return {
            ...x,
            proposer: proposerProfiles[i]
        };
    });

    return (
        <Box className={classnames(className, classes.root)}>
            <div className={classes.label}>
                <Typography variant="h2">{t('latestBlocks')}</Typography>
                <Link href={BLOCKS} passHref>
                    <Typography variant="h4" className="button" component="a">
                        {t('seeMore')}
                    </Typography>
                </Link>
            </div>
            {!state.items.length ? (
                <NoData />
            ) : (
                <>
                    {isDesktop ? (
                        <Desktop className={classes.desktop} items={mergedDataWithProfiles} />
                    ) : (
                        <Mobile className={classes.mobile} items={mergedDataWithProfiles} />
                    )}
                    <Divider className={classes.mobile} />
                    <Link href={BLOCKS} passHref>
                        <Typography variant="h4" component="a" className={classnames(classes.seeMoreFooter, classes.mobile, 'button')}>
                            {t('seeMore')}
                        </Typography>
                    </Link>
                </>
            )}
        </Box>
    );
};

export default Blocks;
