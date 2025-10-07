import React, { useState } from "react";
import { IconButton, CircularProgress } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import LoadingButton from "@mui/lab/LoadingButton";
import { Edit } from "@mui/icons-material";
import { enqueueSnackbar } from "notistack";
import { AxiosError } from "axios";
import axiosInstance from "../../../utils/apis/axios";
import type { BioEditorProps } from "./types";

const BioEditor: React.FC<BioEditorProps> = ({
  textBio,
  handleChangeTextBio,
  themeMode,
}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    try {
      setIsLoading(true);
      await axiosInstance.patch("therapists/", {
        bio: textBio,
      });
      setIsLoading(false);
      setShow(false);
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message, { variant: "error" });
      setIsLoading(false);
    }
  };

  const handleEditBio = () => {
    setShow(!show);
  };

  return (
    <div>
      {show ? (
        <>
          <ReactQuill
            style={{
              height: "150px",
              marginTop: 20,
              color: themeMode === "dark" ? "#eeee" : "#000",
            }}
            theme="snow"
            value={textBio}
            onChange={handleChangeTextBio}
          />
          <LoadingButton
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{ fontSize: "10px", ml: 80 }}
            loading={isLoading}
            loadingIndicator={<CircularProgress size={16} />}
          >
            Save
          </LoadingButton>
        </>
      ) : (
        <>
          <IconButton
            onClick={handleEditBio}
            sx={{ fontSize: "10px", ml: 120 }}
          >
            <Edit />
          </IconButton>
          <div
            dangerouslySetInnerHTML={{ __html: textBio }}
            style={{
              color: themeMode === "dark" ? "#eeee" : "#000",
            }}
          />
        </>
      )}
    </div>
  );
};

export default BioEditor;
