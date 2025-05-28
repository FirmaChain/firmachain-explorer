import React from "react";
import useTranslation from "next-translate/useTranslation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { extractModuleName } from "./utlities";

const ParamsChangeV5: React.FC<{
  className?: string;
  content: {
    "@type": string;
    authority: string;
    params: Record<string, string>;
  };
}> = ({ content }) => {
  console.log(content);
  const { t } = useTranslation("proposals");
  return (
    <div style={{ overflow: "auto" }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("subspace")}</TableCell>
            <TableCell>{t("key")}</TableCell>
            <TableCell>{t("value")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.entries(content.params).map(([key, value]) => (
            <TableRow key={key}>
              <TableCell>{extractModuleName(content["@type"])}</TableCell>
              <TableCell>{key}</TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ParamsChangeV5;
