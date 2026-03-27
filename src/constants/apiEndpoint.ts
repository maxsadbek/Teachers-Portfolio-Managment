const API_ENDPOINTS = {
	LOGIN: "/auth/login",
	USER: {
		USER_ME: "/user",
	},
	FILE: {
		IMAGE: "/api/v1/files",
		PDF: "/api/v1/files/pdf",
	},
	COLLAGE: {
		GETALL: "/college",
		CREATE: "/college",
		EDIT: "/college",
	},
	DEPARTMENTS: {
		CREATE: "/department",
		PAGE: "/department/page",
		LIST: "/department/list",
		EDIT: "/department",
	},
	POSITION: {
		GET_ALL: "/lavozim",
		CREATE: "/lavozim",
		UPDATE: "/lavozim",
		DELETE: "/lavozim",
	},
	TEACHER: {
		CREATE: "/teacher/saveUser",
		GET_ONE: "/teacher",
		DELETE: "/teacher",
		UPDATE_PROFILE: "/teacher/update-profile",
		EDIT: "/teacher/edit",
		SEARCH: "/teacher/search",
	},
};

export const { LOGIN, USER, FILE, COLLAGE, DEPARTMENTS, POSITION } = API_ENDPOINTS;
