import { apiClient } from "@/api/client";
import { NAZORAT } from "@/constants/apiEndpoint";
import type { NazoratCreateDto, NazoratItem, NazoratPagedResponse, NazoratUpdateDto } from "./nazorat.type";

export const NazoratService = {
	getAll() {
		return apiClient.get<NazoratPagedResponse>(NAZORAT.GET_ALL);
	},

	getById(id: number) {
		return apiClient.get<{ success: boolean; message: string; data: NazoratItem }>(`${NAZORAT.GET_BY_ID}/${id}`);
	},

	getByUser(userId: number) {
		return apiClient.get<NazoratPagedResponse>(`${NAZORAT.GET_BY_USER}/${userId}`);
	},

	create(dto: NazoratCreateDto) {
		return apiClient.post<{ success: boolean; message: string; data: NazoratItem }>(NAZORAT.CREATE, dto);
	},

	update(id: number, dto: NazoratUpdateDto) {
		return apiClient.put<{ success: boolean; message: string; data: NazoratItem }>(`${NAZORAT.UPDATE}/${id}`, dto);
	},

	delete(id: number) {
		return apiClient.delete<{ success: boolean; message: string }>(`${NAZORAT.DELETE}/${id}`);
	},
};
