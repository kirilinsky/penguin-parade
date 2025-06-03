import React, { ReactNode } from "react";
import { ExpeditionStatusInfoWrap } from "./expedition-status-info.component.styled";

const ExpeditionStatusInfo = ({
  title,
  text,
}: {
  title: string;
  text: string | number | ReactNode;
}) => {
  return (
    <ExpeditionStatusInfoWrap>
      <span>{title}</span>
      <p>{text}</p>
    </ExpeditionStatusInfoWrap>
  );
};

export default ExpeditionStatusInfo;
