import { TableRow, TableBody, CircularProgress } from "@mui/material";
import RowTable from "./rowTable";

const BodyTable = ({
  therapists,
  loading,
}: {
  therapists: [] | null;
  loading: boolean;
}) => (
  <TableBody sx={{ position: "relative" }}>
    {loading && (
      <TableRow sx={{ position: "absolute", top: "50%", left: "50%" }}>
        <CircularProgress />
      </TableRow>
    )}
    {!loading &&
      therapists?.map((therapist) => <RowTable therapist={therapist} />)}
  </TableBody>
);
export default BodyTable;
