/*
  Copyright (C) 2020 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
import React from "react";
import {
  AuthorI,
  PointI,
  PointReferenceI,
  PointShape,
} from "../dataModels/dataModels";
import { getPointById, getReferenceData } from "../dataModels/getters";
import { StyledSpan, StyledTextArea } from "./StyledPoint";
import Banner from "./Banner";
import { MainPointShape } from "./MainPointShape";

import { connect } from "react-redux";
import { AppState } from "../reducers/store";
import {
  setCurrentMessage,
  SetCurrentMessageParams,
} from "../actions/semanticScreenActions";

interface OwnProps {
  messageId: string;
  darkMode?: boolean;
}

interface AllProps extends OwnProps {
  mainPoint: PointI | null;
  referenceData: PointReferenceI | null;
  referenceAuthor?: AuthorI;
  setCurrentMessage: (params: SetCurrentMessageParams) => void;
}

const MessageListItem = (props: AllProps) => {
  const { mainPoint, referenceData } = props;
  let shape: PointShape | null = null;
  if (mainPoint) {
    shape = mainPoint.shape;
  }

  return (
    <StyledSpan
      onClick={() => props.setCurrentMessage({ messageId: props.messageId })}
      isMainPoint={true}
      isSelected={false}
      referenceAuthor={props.referenceAuthor}
    >
      {shape && (
        <MainPointShape
          shape={shape}
          referenceAuthor={props.referenceAuthor}
          darkMode={props.darkMode}
          onClick={console.log}
        />
      )}
      {mainPoint ? (
        <StyledTextArea
          value={mainPoint.content}
          readOnly={true}
          isMainPoint={true}
          referenceAuthor={props.referenceAuthor}
          darkMode={props.darkMode}
        />
      ) : (
        <div>This message doesn't have any points!</div>
      )}
      {referenceData && (
        <Banner
          authorId={referenceData.referenceAuthorId}
          placement={{ top: "-0.15rem", right: "0.8rem" }}
          darkMode={props.darkMode}
        />
      )}
    </StyledSpan>
  );
};

const mapStateToProps = (state: AppState, ownProps: OwnProps) => {
  const mainPointId = state.messages.byId[ownProps.messageId].main;
  let mainPoint = null;
  let referenceData = null;
  if (mainPointId) {
    mainPoint = getPointById(mainPointId, state.points);
    referenceData = getReferenceData(mainPointId, state.points);
  }
  let referenceAuthor;
  if (referenceData) {
    referenceAuthor = state.authors.byId[referenceData.referenceAuthorId];
  }

  return {
    mainPoint,
    referenceData,
    referenceAuthor,
  };
};

const mapActionsToProps = {
  setCurrentMessage,
};

export default connect(mapStateToProps, mapActionsToProps)(MessageListItem);