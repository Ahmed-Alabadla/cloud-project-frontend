interface TherapistCardType {
  userId: number;
  id: number;
  major: string;
  hourlyRate: number;
  profileImg: string;
  user: {
    fullName: string;
  };
}

interface TherapistCardProps {
  therapist: TherapistCardType;
}

export type { TherapistCardProps, TherapistCardType };
