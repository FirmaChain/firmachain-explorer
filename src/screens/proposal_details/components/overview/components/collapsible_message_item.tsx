import React from 'react';
import ExpandMoreIcon from '@assets/icon-expand-more.svg?react';
import { Tag } from '@components';
import { Collapse } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import type { OverviewType } from '../../../types';
import { KNOWN_GOV_TYPES } from '../constants';
import type { OverviewDisplayType } from '../utils';
import { getExecNestedTypeSummary } from '../utils';
import MessageBodyContent from './message_body_content';

type Props = {
    items: OverviewType['content'][number][];
    displayType: OverviewDisplayType;
    isOpen: boolean;
    onToggle: () => void;
    classes: Record<string, string>;
};

const CollapsibleMessageItem: React.FC<Props> = ({ items, displayType, isOpen, onToggle, classes }) => {
    const { t } = useTranslation('proposals');
    const tMsg = useTranslation('message_labels').t;
    const isGov = (KNOWN_GOV_TYPES as readonly string[]).includes(displayType);
    const single = items.length === 1;
    const isMsgExec = displayType === 'authzExec';

    const nestedSummary = isMsgExec ? getExecNestedTypeSummary(items) : [];

    const label = single ? t(displayType) : `${t(displayType)} (${items.length})`;

    return (
        <div className={classes.messageSection}>
            <div
                className={classes.messageHeader}
                onClick={onToggle}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        onToggle();
                    }
                }}
            >
                {isMsgExec && (
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 8,
                            flexWrap: 'wrap'
                        }}
                    >
                        <Tag value={t('authzExec')} theme="thirteen" className={classes.messagePillTag} />
                        {nestedSummary.map(({ typeStr, tagDisplay, tagTheme, count }) => {
                            const displayLabel = tMsg(tagDisplay);
                            return (
                                <Tag
                                    key={typeStr}
                                    value={count > 1 ? `${displayLabel} (${count})` : displayLabel}
                                    theme={tagTheme as TagTheme}
                                    className={classes.messagePillTag}
                                />
                            );
                        })}
                    </div>
                )}
                {!isMsgExec && isGov && <Tag value={label} theme="seven" className={classes.messagePillTag} />}
                {!isMsgExec && !isGov && <span className={classes.messagePill}>{label}</span>}
                <ExpandMoreIcon className={clsx(classes.messageChevron, isOpen && classes.messageChevronOpen)} />
            </div>
            <Collapse in={isOpen}>
                {single ? (
                    <MessageBodyContent content={items[0]} classes={classes} />
                ) : (
                    <MessageBodyContent items={items} classes={classes} />
                )}
            </Collapse>
        </div>
    );
};

export default CollapsibleMessageItem;
