import ControlPointIcon from "@mui/icons-material/ControlPoint";
import React from "react";
import { Box } from "@mui/material";
import IconStyle from "./classes";
import type { Props } from "./types";

const ChangePhoto: React.FC<Props> = ({
  onChange,
  isProfileOwner,
  hover,
  setHover,
  imgUrl,
}) => (
  <Box
    gridColumn="span 6"
    sx={{
      position: "relative",
      ml: 2,
    }}
    onMouseEnter={() => setHover(true)}
    onMouseLeave={() => setHover(false)}
  >
    <img
      src={imgUrl}
      alt="profile"
      style={{
        width: "100%",
        height: "260px",
        objectFit: "cover",
        opacity: hover && isProfileOwner ? "0.5" : "1",
        borderRadius: "6px",
      }}
    />
    {isProfileOwner && (
      <label htmlFor="upload-photo">
        <input
          accept="image/*"
          id="upload-photo"
          type="file"
          onChange={onChange}
          style={{ display: "none" }}
        />
        {hover && <ControlPointIcon sx={IconStyle} />}
      </label>
    )}
  </Box>
);

export default ChangePhoto;
