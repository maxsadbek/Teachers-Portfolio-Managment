export type NazoratItem = {
  id: number;
  name: string;
  description: string;
  year: number;
  fileUrl: string;
  userId: number;
  researcherName: string;
  univerName: string;
  level: "quyi" | "o'rta" | "yuqori";
  memberEnum: "MILLIY" | "XALQARO";
  finished: boolean;
  member?: boolean;
}