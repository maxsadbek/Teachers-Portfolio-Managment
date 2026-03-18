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
		CREATE: "college",
	},
	DEPARTMENTS: {
		CREATE: "/department",
		PAGE: "/department/page"
	}
};

export const { LOGIN, USER, FILE, COLLAGE, DEPARTMENTS } = API_ENDPOINTS;
