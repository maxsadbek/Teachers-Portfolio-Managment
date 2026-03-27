export interface Teacher {
	id: number;
	fullName: string;
	lavozim: string;
	email: string | null;
	age: number;
	gender: boolean;
	profession: string | null;
	imgUrl: string;
	input: any | null;
	phoneNumber: string;
	departmentName: string;
}

export interface TeacherPage {
	page: number;
	size: number;
	totalPage: number;
	totalElements: number;
	body: Teacher[];
}

export interface TeacherResponse {
	success: boolean;
	message: string;
	data: TeacherPage;
}

export interface CreateTeacherDTO {
		fullName: string;
		phoneNumber: string;
		email: string;
		biography: string;
		input: any | null;
		age: number;
		orcId?: string;
		scopusId?: string;
		scienceId?: string;
		researcherId?: string;
		gender: boolean;
		imageUrl?: string;
		fileUrl?: string;
		profession?: string;
		lavozmId: number;
		departmentId: number;
	}

export interface UpdateTeacherProfileDTO {
	id: number;
	fullName?: string;
	phoneNumber?: string;
	email?: string;
	biography?: string;
	input?: string;
	age?: number;
	orcId?: string;
	scopusId?: string;
	scienceId?: string;
	researcherId?: string;
	gender?: boolean;
	imageUrl?: string;
	fileUrl?: string;
	profession?: string;
	lavozmId?: number;
	departmentId?: number;
}

export interface EditTeacherDTO {
	fullName: string;
	phoneNumber: string;
	imgUrl?: string;
	fileUrl?: string;
	lavozmId: number;
	gender: boolean;
	password?: string;
	departmentId: number;
}

export interface DeleteTeacherResponse {
	success: boolean;
	message: string;
	data: string;
}

export interface SearchTeacherResponse {
	success: boolean;
	message: string;
	data: {
		page: number;
		size: number;
		totalPage: number;
		totalElements: number;
		body: Teacher[];
	};
}
