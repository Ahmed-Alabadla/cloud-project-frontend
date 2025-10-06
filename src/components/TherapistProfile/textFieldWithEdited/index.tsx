/* eslint-disable react/jsx-indent */
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Edit from "@mui/icons-material/Edit";
import { CircularProgress } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import LoadingButton from "@mui/lab/LoadingButton";
import getStyle from "./style";
import axiosInstance from "../../../utils/apis/axios";
import type { Props } from "./types";

const EditableTextField: React.FC<Props> = ({
  value,
  dataType,
  onChange,
  isProfileOwner,
  themeMode,
}) => {
  const [editMode, setEditMode] = useState(false);
  const [mouseOver, setMouseOver] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleMouseover = () => {
    setMouseOver(!mouseOver);
  };

  const handleClick = () => {
    setEditMode(true);
    setMouseOver(false);
  };

  const handleUpdate = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.patch("therapists/", {
        [dataType]: value,
      });
      setEditMode(false);
      setIsLoading(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const style = getStyle(dataType, themeMode);
  return (
    <TextField
      name="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={!editMode}
      onMouseEnter={toggleMouseover}
      onMouseLeave={toggleMouseover}
      variant="standard"
      sx={style}
      InputProps={{
        disableUnderline: true,
        endAdornment: (
          <InputAdornment position="end">
            {isProfileOwner ? (
              <IconButton onClick={handleClick}>
                <Edit />
              </IconButton>
            ) : null}
            {editMode && (
              <LoadingButton
                variant="contained"
                onClick={handleUpdate}
                loading={isLoading}
                loadingIndicator={<CircularProgress size={16} />}
              >
                Save
              </LoadingButton>
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default EditableTextField;
