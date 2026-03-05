import React from "react";
import numeral from "numeral";
import classnames from "classnames";
import { Divider } from "@material-ui/core";
import { SingleProposal, Box } from "@components";
import MetadataSection from "./components/metadata_section";
import MessagesSection from "./components/messages_section";
import { useStyles } from "./styles";
import { useOverviewState } from "./hooks/use_overview_state";
import type { OverviewType } from "../../types";

const Overview: React.FC<{ overview: OverviewType } & ComponentDefault> = ({
  className,
  overview,
}) => {
  const classes = useStyles();
  const {
    messageGroups,
    hasMessageContent,
    overviewType,
    openStates,
    toggleOpen,
  } = useOverviewState(overview);

  return (
    <Box className={classnames(className, classes.root)}>
      <SingleProposal
        id={`#${numeral(overview.id).format("0,0")}`}
        title={overview.title}
        status={overview.status}
      />
      <Divider />
      <MetadataSection
        overview={overview}
        overviewType={overviewType}
        classes={classes}
      />
      {hasMessageContent && (
        <>
          <Divider />
          <MessagesSection
            messageGroups={messageGroups}
            openStates={openStates}
            toggleOpen={toggleOpen}
            classes={classes}
          />
        </>
      )}
    </Box>
  );
};

export default Overview;
