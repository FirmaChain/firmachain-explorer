import React from 'react';
import { Box, SingleProposal } from '@components';
import { Divider } from '@mui/material';
import classnames from 'classnames';
import numeral from 'numeral';

import type { OverviewType } from '../../types';
import MessagesSection from './components/messages_section';
import MetadataSection from './components/metadata_section';
import { useOverviewState } from './hooks/use_overview_state';
import { useStyles } from './styles';

const Overview: React.FC<{ overview: OverviewType } & ComponentDefault> = ({ className, overview }) => {
    const classes = useStyles();
    const { messageGroups, hasMessageContent, overviewType, openStates, toggleOpen } = useOverviewState(overview);

    return (
        <Box className={classnames(className, classes.root)}>
            <SingleProposal id={`#${numeral(overview.id).format('0,0')}`} title={overview.title} status={overview.status} />
            <Divider />
            <MetadataSection overview={overview} overviewType={overviewType} classes={classes} />
            {hasMessageContent && (
                <>
                    <Divider />
                    <MessagesSection messageGroups={messageGroups} openStates={openStates} toggleOpen={toggleOpen} classes={classes} />
                </>
            )}
        </Box>
    );
};

export default Overview;
