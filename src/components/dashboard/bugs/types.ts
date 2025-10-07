export interface Bug {
  id: number;
  title: string;
  description: string;
  priority: string;
  status?: string | undefined;
  assignedTo?: string | undefined;
}
