import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Typography } from '@mui/material';

import type { MessageGroup } from '../utils';
import CollapsibleMessageItem from './collapsible_message_item';

type Props = {
    messageGroups: MessageGroup[];
    openStates: Record<number, boolean>;
    toggleOpen: (groupIndex: number) => void;
    classes: Record<string, string>;
};

const MessagesSection: React.FC<Props> = ({ messageGroups, openStates, toggleOpen, classes }) => {
    const { t } = useTranslation('proposals');

    return (
        <div className={classes.content}>
            <Typography variant="body1" className="label">
                {t('messages')}
            </Typography>
            <div className={classes.messageList}>
                {messageGroups.map((group, groupIndex) => (
                    <CollapsibleMessageItem
                        key={groupIndex}
                        items={group.items}
                        displayType={group.displayType}
                        isOpen={!!openStates[groupIndex]}
                        onToggle={() => toggleOpen(groupIndex)}
                        classes={classes}
                    />
                ))}
            </div>
        </div>
    );
};

export default MessagesSection;
