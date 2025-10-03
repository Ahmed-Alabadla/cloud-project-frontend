import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import { dashHead } from "./classes";

const TableHeader = () => (
  <TableHead>
    <TableRow>
      <TableCell sx={dashHead}>Therapist</TableCell>
      <TableCell sx={dashHead} align="center">
        CV
      </TableCell>
      <TableCell sx={dashHead} align="center">
        Status
      </TableCell>
      <TableCell sx={dashHead} align="center">
        Options
      </TableCell>
    </TableRow>
  </TableHead>
);

export default TableHeader;
