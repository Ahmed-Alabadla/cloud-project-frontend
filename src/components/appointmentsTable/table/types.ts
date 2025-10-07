import { Dayjs } from 'dayjs';

export interface TAppointments {
  date: Dayjs | string;
  loadingChange: (value: boolean) => void;
  loading: boolean;
}
export interface DateP {
  date: string | Dayjs;
  setDate: (value: string | Dayjs) => void;
}
export interface Appointment {
  id: number;
  isBooked: boolean;
  isAvailable: boolean;
  datetime: string;
  therapistId: number;
}

export interface TRow {
  appointment: Appointment
}
