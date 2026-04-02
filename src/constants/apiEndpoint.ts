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
		GET_ALL: "/teacher/page",
		GET_ONE: "/teacher",
		DELETE: "/teacher",
		UPDATE_PROFILE: "/teacher/update-profile",
		EDIT: "/teacher/edit",
		SEARCH: "/teacher/search",
	},
	RESEARCH: {
		GET_ALL: "/research",
		GET_BY_ID: "/research",
		GET_BY_USER: "/research/byUser",
		CREATE: "/research",
		UPDATE: "/research",
		DELETE: "/research",
	},
	NAZORAT: {
		GET_ALL: "/nazorat",
		GET_BY_ID: "/nazorat",
		GET_BY_USER: "/nazorat/byUser",
		CREATE: "/nazorat",
		UPDATE: "/nazorat",
		DELETE: "/nazorat",
	},
	CONSULTATION: {
		GET_ALL: "/maslahat",
		GET_BY_ID: "/maslahat",
		GET_BY_USER: "/maslahat/byUser",
		CREATE: "/maslahat",
		UPDATE: "/maslahat",
		DELETE: "/maslahat",
	},
	AWARD: {
		GET_ALL: "/award",
		GET_BY_ID: "/award",
		GET_BY_USER: "/award/byUser",
		CREATE: "/award",
		UPDATE: "/award",
		DELETE: "/award",
	},
};

export const { LOGIN, USER, FILE, COLLAGE, DEPARTMENTS, POSITION, TEACHER, RESEARCH, NAZORAT, CONSULTATION, AWARD } =
	API_ENDPOINTS;
