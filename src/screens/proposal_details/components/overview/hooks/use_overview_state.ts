import { useState, useCallback } from "react";
import type { OverviewType } from "../../../types";
import { toContentArray, getOverviewDisplayType, getMessageGroups } from "../utils";
export function useOverviewState(overview: OverviewType) {
  const contentArray = toContentArray(overview.content as OverviewType["content"] | string);
  const messageItems = contentArray.filter(
    (c): c is OverviewType["content"][number] => typeof c === "object" && c !== null
  ) as OverviewType["content"][number][];
  const messageGroups = getMessageGroups(messageItems);
  const hasMessageContent = messageItems.length > 0;
  const overviewType = getOverviewDisplayType(messageItems);

  const [openStates, setOpenStates] = useState<Record<number, boolean>>({});
  const toggleOpen = useCallback((groupIndex: number) => {
    setOpenStates((prev) => ({ ...prev, [groupIndex]: !prev[groupIndex] }));
  }, []);

  return {
    messageGroups,
    hasMessageContent,
    overviewType,
    openStates,
    toggleOpen,
  };
}
