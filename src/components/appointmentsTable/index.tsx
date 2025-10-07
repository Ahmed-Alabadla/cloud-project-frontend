import { Container } from '@mui/material';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';

import DatePick from './date/datePicker';
import AppointmentsTable from './table';

const AppointmentTableContainer = () => {
  const [date, setDate] = useState<Dayjs | string>(dayjs());
  const [loading, setLoading] = useState<boolean>(true);

  return (
    <Container sx={{ position: 'relative', mt: 10 }}>
      <DatePick
        date={date}
        setDate={setDate as React.Dispatch<React.SetStateAction<Dayjs | string>>} />
      <AppointmentsTable
        loadingChange={setLoading as React.Dispatch<React.SetStateAction<boolean>>} loading={loading}
        date={date}
      />
    </Container>
  );
};

export default AppointmentTableContainer;
