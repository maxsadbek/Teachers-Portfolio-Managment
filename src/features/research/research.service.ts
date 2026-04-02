import { apiClient } from "@/api/client";
import { RESEARCH } from "@/constants/apiEndpoint";
import type {
	ResearchByUserResponse,
	ResearchCreateDto,
	ResearchItem,
	ResearchListResponse,
	ResearchUpdateDto,
} from "./research.type";

export const ResearchService = {
	getAll() {
		return apiClient.get<ResearchListResponse>(RESEARCH.GET_ALL);
	},

	getById(id: number) {
		return apiClient.get<{ success: boolean; message: string; data: ResearchItem }>(`${RESEARCH.GET_BY_ID}/${id}`);
	},

	getByUser(userId: number) {
		return apiClient.get<ResearchByUserResponse>(`${RESEARCH.GET_BY_USER}/${userId}`);
	},

	create(dto: ResearchCreateDto) {
		return apiClient.post<{ success: boolean; message: string; data: ResearchItem }>(RESEARCH.CREATE, dto);
	},

	update(id: number, dto: ResearchUpdateDto) {
		return apiClient.put<{ success: boolean; message: string; data: ResearchItem }>(`${RESEARCH.UPDATE}/${id}`, dto);
	},

	delete(id: number) {
		return apiClient.delete<{ success: boolean; message: string }>(`${RESEARCH.DELETE}/${id}`);
	},
};
