export interface CreateTeacherDTO {
	id: number;
	fullName: "string";
	phoneNumber: "string";
	email: "string";
	biography: "string";
	input: "string";
	age: number;
	orcId: "string";
	scopusId: "string";
	scienceId: "string";
	researcherId: "string";
	gender: boolean;
	imageUrl: "string";
	fileUrl: "string";
	profession: "string";
	lavozmId: number;
	departmentId: number;
}

export interface Teacher {
	id: number;
	fullName: "string";
	phone: "string";
	email: "string";
	biography: "string";
	input: "string";
	age: number;
	gender: boolean;
	orcId: "string";
	scopusId: "string";
	scienceId: "string";
	researcherId: "string";
	imageUrl: "string";
	fileUrl: "string";
	profession: "string";
}

export interface TeacherResponse {
	success: boolean;
	message: string;
	data: Teacher;
}

export interface UpdateTeacherProfileDTO {
	id: number;
	fullName: "string";
	phoneNumber: "string";
	email: "string";
	biography: "string";
	input: "string";
	age: number;
	orcId: "string";
	scopusId: "string";
	scienceId: "string";
	researcherId: "string";
	gender: boolean;
	imageUrl: "string";
	fileUrl: "string";
	profession: "string";
	lavozmId: number;
	departmentId: number;
}

export interface EditTeacherDTO {
	fullName: "string";
	phoneNumber: "string";
	imgUrl: "string";
	fileUrl: "string";
	lavozmId: number;
	gender: boolean;
	password: "string";
	departmentId: number;
}
export interface DeleteTeacherResponse {
	success: boolean;
	message: string;
  data: string;
}

export interface SearchTeacherParams {
		success: boolean;
		message: string;
		data: null;
	}
