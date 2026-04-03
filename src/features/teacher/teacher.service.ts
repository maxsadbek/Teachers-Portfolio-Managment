import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import {
	Teacher,
	TeacherResponse,
	CreateTeacherDTO,
	UpdateTeacherProfileDTO,
	EditTeacherDTO,
	DeleteTeacherResponse,
} from "./teacher.type";

export interface TeacherPageResponse {
	body: Teacher[];
	page: number;
	size: number;
	totalElements: number;
	totalPage: number;
}

export interface TeacherSearchParams {
	search?: string;
}

export const TeacherService = {
	getAll(page = 0, size = 100, params?: TeacherSearchParams) {
		return apiClient.get<TeacherPageResponse>(TEACHER.SEARCH, {
			params: {
				query: params?.search ?? "",
				page,
				size,
			},
		});
	},

	getById(id: number) {
		return apiClient.get<TeacherResponse>(`${TEACHER.GET_ONE}/${id}`);
	},

	create(data: CreateTeacherDTO) {
		return apiClient.post<DeleteTeacherResponse>(TEACHER.CREATE, data);
	},

	updateProfile(data: UpdateTeacherProfileDTO) {
		return apiClient.put<DeleteTeacherResponse>(TEACHER.UPDATE_PROFILE, data);
	},

	edit(id: number, data: EditTeacherDTO) {
		return apiClient.patch<DeleteTeacherResponse>(`${TEACHER.EDIT}/${id}`, data);
	},

	remove(id: number) {
		return apiClient.delete<DeleteTeacherResponse>(`${TEACHER.DELETE}/${id}`);
	},
};
