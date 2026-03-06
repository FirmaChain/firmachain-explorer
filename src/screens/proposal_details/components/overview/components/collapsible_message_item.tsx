import React from 'react';
import classnames from 'classnames';
import { Collapse } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import useTranslation from 'next-translate/useTranslation';
import { Tag } from '@components';
import { KNOWN_GOV_TYPES } from '../constants';
import type { OverviewDisplayType } from '../utils';
import MessageBodyContent from './message_body_content';
import type { OverviewType } from '../../../types';

type Props = {
  items: OverviewType['content'][number][];
  displayType: OverviewDisplayType;
  isOpen: boolean;
  onToggle: () => void;
  classes: Record<string, string>;
};

const CollapsibleMessageItem: React.FC<Props> = ({
  items,
  displayType,
  isOpen,
  onToggle,
  classes,
}) => {
  const { t } = useTranslation('proposals');
  const isGov = (KNOWN_GOV_TYPES as readonly string[]).includes(displayType);
  const single = items.length === 1;
  const label = single ? t(displayType) : `${t(displayType)} (${items.length})`;
  const tagTheme = displayType === 'msgExec' ? 'thirteen' : 'seven';

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
        {isGov ? (
          <Tag value={label} theme={tagTheme} className={classes.messagePillTag} />
        ) : (
          <span className={classes.messagePill}>{label}</span>
        )}
        <ExpandMoreIcon
          className={classnames(classes.messageChevron, isOpen && classes.messageChevronOpen)}
        />
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
