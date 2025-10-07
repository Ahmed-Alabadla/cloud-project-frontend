import type { Dispatch, SetStateAction } from "react";

interface TherapistData {
  id: number;
  cvLink: string;
  profileImg: string;
  major: string;
  hourlyRate: number;
  bio: string;
  user: {
    fullName?: string;
    email?: string;
    isActive: boolean;
  };
}
interface Props {
  isProfileOwner: boolean;
  setError: Dispatch<SetStateAction<boolean>>;
}
export type { TherapistData, Props };
