import { apiClient } from "@/api/client";
import { TEACHER } from "@/constants/apiEndpoint";
import {
	TeacherResponse,
	CreateTeacherDTO,
	UpdateTeacherProfileDTO,
	EditTeacherDTO,
	DeleteTeacherResponse,
	SearchTeacherResponse,
} from "./teacher.type";

export const TeacherService = {
	getAll(page = 0, size = 10) {
		return apiClient.get<TeacherResponse>(TEACHER.GET_ONE, { params: { page, size } });
	},

	getById(id: number) {
		return apiClient.get<TeacherResponse>(`${TEACHER.GET_ONE}/${id}`);
	},

	search(query: string, page = 0, size = 10) {
		return apiClient.get<SearchTeacherResponse>(TEACHER.SEARCH, { params: { query, page, size } });
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
