import { useEffect, useState } from "react";
import {
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
} from "@mui/material";
import { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import DeleteIcon from "@mui/icons-material/Delete";
import GitHubIcon from "@mui/icons-material/GitHub";
import InfoIcon from "@mui/icons-material/Info";
import { axiosInstance } from "../../../utils/apis";
import { dashHead, tableContainer } from "./classes";
import ModalGitHub from "../../modalForGithub";
import type { Bug } from "./types";

export default function Bugs() {
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    const getBugs = async () => {
      try {
        const response = await axiosInstance.get("/bugs");
        setBugs(response.data);
      } catch (error) {
        const axiosError = error as AxiosError;
        enqueueSnackbar(axiosError.message, { variant: "error" });
      }
    };
    getBugs();
  }, []);

  const handleDeleteBugs = async (id: number) => {
    try {
      await axiosInstance.delete(`/bugs/${id}`);
      setBugs((prevBugs) => prevBugs.filter((bug) => bug.id !== id));
      enqueueSnackbar("Bug deleted successfully.", { variant: "success" });
    } catch (error) {
      const axiosError = error as AxiosError;
      enqueueSnackbar(axiosError.message, { variant: "error" });
    }
  };

  return (
    <TableContainer sx={tableContainer}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={dashHead} align="center">
              title
            </TableCell>
            <TableCell sx={dashHead} align="center">
              Description
            </TableCell>
            <TableCell sx={dashHead} align="center">
              priority
            </TableCell>
            <TableCell sx={dashHead} align="center">
              Status
            </TableCell>
            <TableCell sx={dashHead} align="center">
              Actions
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bugs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} align="center" sx={{ fontWeight: "bold" }}>
                <InfoIcon fontSize="small" color="error" sx={{ mr: 1 }} />
                No bugs to display.
              </TableCell>
            </TableRow>
          ) : (
            bugs.map((bug) => (
              <TableRow key={bug.id}>
                <TableCell align="center">{bug.title}</TableCell>
                <TableCell align="center">{bug.description}</TableCell>
                <TableCell align="center">{bug.priority}</TableCell>
                <TableCell align="center">{bug.status}</TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    startIcon={<DeleteIcon />}
                    sx={{ backgroundColor: "#C62828", mr: 2 }}
                    onClick={() => handleDeleteBugs(bug.id)}
                  >
                    Delete
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<GitHubIcon />}
                    sx={{ backgroundColor: "#000" }}
                    onClick={handleOpen}
                  >
                    To GitHub
                  </Button>
                  <ModalGitHub open={open} setOpen={setOpen} id={bug.id} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
