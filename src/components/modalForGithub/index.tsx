import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  Box,
  Typography,
  Select,
  MenuItem,
  IconButton,
  type SelectChangeEvent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { axiosInstance } from "../../utils/apis";

interface TypeModal {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  id: number;
}

const ModalGitHub = ({ open, setOpen, id }: TypeModal) => {
  const [selectedOption, setSelectedOption] = useState<string>("unassigned");
  const [contributors, setContributors] = useState<string[]>([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
    setSelectedOption(event.target.value as string);
  };

  const handleGoToGitHub = async () => {
    try {
      await axiosInstance.post("/bugs/github", {
        id,
        assignedTo: selectedOption,
      });
      enqueueSnackbar("Successfully assigned to contributor.", {
        variant: "success",
      });
      handleClose();
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message, { variant: "error" });
    }
  };

  useEffect(() => {
    const getContributors = async () => {
      try {
        const response = await axiosInstance.get("/bugs/contributors");
        setContributors(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        enqueueSnackbar(axiosError.message, { variant: "error" });
      }
    };

    getContributors();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 380,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
        }}
      >
        <IconButton
          aria-label="close"
          color="inherit"
          onClick={handleClose}
          sx={{
            ml: "auto",
          }}
        >
          <Close />
        </IconButton>
        <Typography variant="h6" component="h2">
          Assigned To Contributors
        </Typography>

        <Select
          value={selectedOption}
          onChange={handleSelectChange}
          sx={{ mt: 2, width: "300px" }}
        >
          {contributors.map((contributor) => (
            <MenuItem key={contributor} value={contributor}>
              {contributor}
            </MenuItem>
          ))}
        </Select>
        <Button variant="contained" sx={{ mt: 3 }} onClick={handleGoToGitHub}>
          Assign to Contributor
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalGitHub;
