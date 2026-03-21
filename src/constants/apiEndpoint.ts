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
		EDIT: "/college"
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
		STATISTICS: "/lavozim/get-lavozim-statistiks",
	},
};

export const { LOGIN, USER, FILE, COLLAGE, DEPARTMENTS } = API_ENDPOINTS;
