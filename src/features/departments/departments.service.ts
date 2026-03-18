import { apiClient } from "@/api/client";
import { DEPARTMENTS } from "@/constants/apiEndpoint";
import type { CreateDepartmentDTO, DepartmentCreateResponse, DepartmentPageParams, DepartmentPageResponse,DepartmentListResponse } from "./departments.type";

export const departmentService = {
	getPage(params: DepartmentPageParams) {
		return apiClient.get<DepartmentPageResponse>(DEPARTMENTS.PAGE, {params});
	},
	getList() {
		return apiClient.get<DepartmentListResponse>(DEPARTMENTS.LIST)
	},
	create(data: CreateDepartmentDTO) {
		return apiClient.post<DepartmentCreateResponse>(DEPARTMENTS.CREATE, data);
	},
};
