import { Box, Button } from "@mui/material";
import { useState } from "react";

const Filter = ({
  setActive,
  setCurrentPage,
}: {
  setActive: typeof useState<boolean | null>;
  setCurrentPage: typeof useState<number>;
}) => (
  <Box
    sx={{
      background: "#bcc8ff",
      borderRadius: "5px",
      padding: "5px",
      margin: "3px",
    }}
  >
    {" "}
    <Button sx={{ color: "white" }} onClick={() => setActive(null)}>
      All
    </Button>
    <Button
      sx={{ color: "white" }}
      onClick={() => {
        setActive(true);
        setCurrentPage(1);
      }}
    >
      Active
    </Button>
    <Button
      sx={{ color: "white" }}
      onClick={() => {
        setActive(false);
        setCurrentPage(1);
      }}
    >
      In Active
    </Button>
  </Box>
);
export default Filter;
