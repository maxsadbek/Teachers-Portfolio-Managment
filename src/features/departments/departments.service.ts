import { apiClient } from "@/api/client";
import { DEPARTMENTS } from "@/constants/apiEndpoint";
import type { CreateDepartmentDTO, DepartmentCreateResponse, DepartmentPageParams, DepartmentPageResponse } from "./departments.type";

export const departmentService = {
	getPage(params: DepartmentPageParams) {
		return apiClient.get<DepartmentPageResponse>(DEPARTMENTS.PAGE, {params});
	},
	create(data: CreateDepartmentDTO) {
		return apiClient.post<DepartmentCreateResponse>(DEPARTMENTS.CREATE, data);
	},
};
