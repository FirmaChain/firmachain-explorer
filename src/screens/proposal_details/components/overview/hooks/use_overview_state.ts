import { useCallback, useState } from 'react';

import type { OverviewType } from '../../../types';
import { getMessageGroups, getOverviewDisplayType, toContentArray } from '../utils';

export const useOverviewState = (overview: OverviewType) => {
    const messageItems = toContentArray(overview.content as OverviewType['content'] | string);
    const messageGroups = getMessageGroups(messageItems);
    const overviewType = getOverviewDisplayType(messageItems);
    const hasMessageContent = messageItems.length > 0 && overviewType !== 'textProposal';

    const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
    const toggleOpen = useCallback((groupIndex: number) => {
        setOpenStates((prev) => ({
            ...prev,
            [groupIndex]: !prev[groupIndex]
        }));
    }, []);

    return {
        messageGroups,
        hasMessageContent,
        overviewType,
        openStates,
        toggleOpen
    };
};
