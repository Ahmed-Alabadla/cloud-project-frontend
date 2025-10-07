import { useContext, useState } from 'react';
import { TableRow, TableCell, Checkbox } from '@mui/material';
import dayjs from 'dayjs';
import { useSnackbar, type VariantType } from 'notistack';
import { bodyCell } from './style';
import axiosInstance from '../../../utils/apis/axios';
import type { TRow } from './types';
import { ThemeContext } from '../../../context';

const RowTable = ({ appointment }:TRow) => {
  const { enqueueSnackbar } = useSnackbar();
  const themes = useContext(ThemeContext);
  const showSnackbar = (message:string, severity:VariantType) => {
    enqueueSnackbar(message, { variant: severity });
  };
  const {
    isAvailable, isBooked, datetime, id,
  } = appointment;
  const [availability, setAvailability] = useState<boolean>(isAvailable);
  const availabilityHandler = async () => {
    try {
      await axiosInstance.put(`/appointments/${id}`);
      setAvailability(!availability);
    } catch (error) {
      showSnackbar('Something went wrong', 'error');
    }
  };
  return (
    <TableRow sx={{ backgroundColor: availability ? 'white' : '#ffe766' }}>
      <TableCell sx={bodyCell(themes?.themeMode)}>
        {
        `${dayjs(datetime).format('lll')}`
}
      </TableCell>
      <TableCell sx={bodyCell(themes?.themeMode)}>{isBooked ? 'BOOKED' : 'PENDING'}</TableCell>
      <TableCell sx={bodyCell(themes?.themeMode)}>{availability ? 'AVAILABLE' : 'CANCELED'}</TableCell>
      <TableCell sx={bodyCell(themes?.themeMode)}>
        <Checkbox
          disabled={isBooked}
          checked={!availability}
          onChange={availabilityHandler}
          style={{ color: 'red' }}
        />
      </TableCell>
    </TableRow>

  );
};

export default RowTable;
