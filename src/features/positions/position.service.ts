import { apiClient } from "@/api/client";
import { POSITION } from "@/constants/apiEndpoint";
import { PositionDTO, PositionResponse } from "./position.type";

export const PositionService = {
	getAll() {
		return apiClient.get<PositionResponse<any>>(POSITION.GET_ALL);
	},
	create(data: PositionDTO) {
		return apiClient.post<PositionResponse<any>>(POSITION.CREATE, data);
	},

	update(id: number, data: PositionDTO) {
		return apiClient.put<PositionResponse<any>>(`${POSITION.UPDATE}/${id}`, data);
	},
	remove(id: number) {
		return apiClient.delete<PositionResponse<any>>(`${POSITION.DELETE}/${id}`);
	},
	getStatistics() {
		return apiClient.get<PositionResponse<any>>(`${POSITION.GET_ALL}/get-lavozim-statistiks`);
	},
};
