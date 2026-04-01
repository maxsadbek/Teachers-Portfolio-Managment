export type ConsultationItem = {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  univerName?: string;
  researcherName?: string;
  leader?: string;
  level?: "quyi" | "o'rta" | "yuqori";
  member?: boolean;
  memberEnum?: "MILLIY" | "XALQARO";
  finished?: boolean;
  finishedEnum?: "COMPLETED" | "IN_PROGRESS" | "REJECTED";
}