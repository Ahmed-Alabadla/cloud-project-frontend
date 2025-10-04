export interface User {
  fullName: string;
  isActive: boolean;
  email: string;
  phoneNumber: string;
}

export interface Therapist {
  cvLink: string;
  hourlyRate: number;
  major: string;
  profileImg: string;
  user: User;
  userId: number;
}
