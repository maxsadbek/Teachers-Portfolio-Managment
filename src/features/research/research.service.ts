import { apiClient } from "@/api/client"
import { RESEARCH } from "@/constants/apiEndpoint"
import { GetByIdResponse } from "./research.type"

export const ResearchService={
  getById(id:number){
    return apiClient.get<GetByIdResponse>(`${RESEARCH.GETBYID}/${id}`)
  }
}