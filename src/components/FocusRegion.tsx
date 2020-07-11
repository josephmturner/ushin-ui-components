/*
  Copyright (C) 2020 by USHIN, Inc.

  This file is part of U4U.

  U4U is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  U4U is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with U4U.  If not, see <https://www.gnu.org/licenses/>.
*/
import React, { useEffect, useState } from "react";
import FocusPoint from "./FocusPoint";
import Placeholder from "./Placeholder";
import ChooseShapes from "./ChooseShapes";
import StyledFocusRegion from "./StyledFocusRegion";
import { PointI, RegionI } from "../constants/AppState";

const FocusRegion = (props: {
  region: RegionI;
  isExpanded: string;
  point: PointI | undefined;
  appDispatch: any;
  editingPoint: PointI["pointId"] | undefined;
  createEmptyFocus: any;
  onRegionClick: any;
}) => {
  const {
    region,
    isExpanded,
    point,
    appDispatch,
    editingPoint,
    createEmptyFocus,
    onRegionClick,
  } = props;

  const [chooseShapes, setChooseShapes] = useState(false);

  // replace imageUrl with 7-icon, "U-shaped" svg, which
  // expands to fill the middle of the expanded focus region.
  // When expanded, each of the 7 shapes calls setMakingNewFocus
  const placeholderText = `New focus point`;
  const placeholderImg = require(`../images/merits.svg`);
  const placeholderImgAlt = "Choose a new focus shape.";

  //TODO: delete onRegionClick below and in handleClick because placeholder and chooseShapes
  //are only present when the region is expanded.
  const handlePlaceholderClick = () => {
    onRegionClick(region, true);
    setChooseShapes(true);
  };

  const handleChooseShapesClick = (shape: string, e: any) => {
    e.stopPropagation();
    onRegionClick(region, true);
    setChooseShapes(false);
    createEmptyFocus(shape);
  };

  useEffect(() => {
    isExpanded === "expanded" && !point
      ? setChooseShapes(true)
      : setChooseShapes(false);
  }, [isExpanded, point]);

  return (
    <StyledFocusRegion onClick={() => onRegionClick(region, false)}>
      <div>
        {point && (
          <FocusPoint
            point={point}
            appDispatch={appDispatch}
            isEditing={point && editingPoint === point.pointId ? true : false}
            onEnterPress={() => console.log("enter pressed in focus region")}
            onClick={() => onRegionClick(region, true)}
          />
        )}
        {!chooseShapes && isExpanded === "expanded" && (
          <Placeholder
            text={placeholderText}
            img={placeholderImg}
            imgAlt={placeholderImgAlt}
            onClick={handlePlaceholderClick}
          />
        )}
        {chooseShapes && isExpanded === "expanded" && (
          <ChooseShapes handleClick={handleChooseShapesClick} />
        )}
      </div>
    </StyledFocusRegion>
  );
};

export default FocusRegion;
