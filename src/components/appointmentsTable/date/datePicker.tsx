import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';

import type { DateP } from '../table/types';

const DatePick = ({
  setDate, date,
}: DateP) => (
  <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DatePicker
      format="DD-MM-YYYY"
      sx={{ position: 'absolute', top: -54, right: '30px' }}
      onChange={(newValue) => {
        setDate(dayjs(newValue));
      }}
      value={date}
      label="Appointments Calendar"
    />
  </LocalizationProvider>
);

export default DatePick;
