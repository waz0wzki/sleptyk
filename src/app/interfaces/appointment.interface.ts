import { PatientInterface } from './patient.interface';

export interface AppointmentInterface {
  id: string;
  date: string;
  hour: string;
  type: string;
  patient?: PatientInterface;
  status: string;
}
