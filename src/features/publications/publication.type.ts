type PublicationType = "ARTICLE" | "BOOK" | "PROCEEDING" | "OTHERS"
type AothorType = "COAUTHOR" | "FIRTS_AUTHOR" | "BOTH_AUTHOR";
type DegreeType = "INTERNATIONAL" | "NATIONAL";

export type PublicationItem = {
  userId: number,
  name: string,
  description: string,
  year: number,
  fileUrl: string,
  type: PublicationType,
  author: AothorType,
  degree: DegreeType,
  volume: string,
  institution:string,
  popular: boolean
}
