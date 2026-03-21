import { apiClient } from "@/api/client";
import { DEPARTMENTS } from "@/constants/apiEndpoint";
import {
	CreateDepartmentDTO,
	DepartmentCreateResponse,
	DepartmentPageParams,
	DepartmentPageResponse,
	DepartmentListResponse,
	UpdateDepartmentDTO,
	DepartmentUpdateResponse,
	DepartmentDeleteResponse,
} from "./departments.type";

export const departmentService = {
	getPage(params: DepartmentPageParams) {
		return apiClient.get<DepartmentPageResponse>(DEPARTMENTS.PAGE, { params });
	},
	getList() {
		return apiClient.get<DepartmentListResponse>(DEPARTMENTS.LIST);
	},
	create(data: CreateDepartmentDTO) {
		return apiClient.post<DepartmentCreateResponse>(DEPARTMENTS.CREATE, data);
	},
	update(id: number, data: UpdateDepartmentDTO) {
		return apiClient.put<DepartmentUpdateResponse>(`${DEPARTMENTS.EDIT}/${id}`, data);
	},
	remove(id: number) {
		return apiClient.delete<DepartmentDeleteResponse>(`${DEPARTMENTS.EDIT}/${id}`);
	},
};
