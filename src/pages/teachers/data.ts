export type Teacher = {
	id: number;
	name: string;
	phone: string;
	faculty: string;
	department: string;
	position: string;
	email: string;
};

export type TeacherFormValues = {
	fullName: string;
	phone: string;
	facultyId: string;
	departmentId: string;
	positionId: string;
	image: File | null;
	password: string;
	confirmPassword: string;
};

export const FACULTIES = [
	{ value: "1", label: "Davolash fakulteti" },
	{ value: "2", label: "Pediatriya fakulteti" },
	{ value: "3", label: "Stomatologiya va Farmatsiya fakulteti" },
	{ value: "4", label: "Tibbiy profilaktika fakulteti" },
	{ value: "5", label: "Tibbiy biologiya fakulteti" },
	{ value: "6", label: "Oliy hamshiralik ishi fakulteti" },
	{ value: "7", label: "Magistratura va doktorantura" },
];

export const DEPARTMENTS = [
	{ value: "1", label: "Farmatsiya va kimyo kafedrasi", facultyId: "3" },
	{ value: "2", label: "Ichki kasalliklar kafedrasi", facultyId: "1" },
	{ value: "3", label: "Jarrohlik kafedrasi", facultyId: "1" },
	{ value: "4", label: "Bolalar kasalliklari kafedrasi", facultyId: "2" },
	{ value: "5", label: "Stomatologiya kafedrasi", facultyId: "3" },
	{ value: "6", label: "Akusherlik va ginekologiya", facultyId: "4" },
	{ value: "7", label: "Nevrologiya kafedrasi", facultyId: "1" },
	{ value: "8", label: "Biokimyo kafedrasi", facultyId: "5" },
	{ value: "9", label: "Fiziologiya kafedrasi", facultyId: "5" },
	{ value: "10", label: "Hamshiralik ishi kafedrasi", facultyId: "6" },
	{ value: "11", label: "Umumiy gigiyena kafedrasi", facultyId: "4" },
	{ value: "12", label: "Tibbiy biologiya kafedrasi", facultyId: "7" },
];

export const POSITIONS = [
	{ value: "1", label: "Professor" },
	{ value: "2", label: "Dotsent" },
	{ value: "3", label: "Katta o'qituvchi" },
	{ value: "4", label: "Assistent" },
	{ value: "5", label: "O'qituvchi" },
];

export const TEACHERS: Teacher[] = [];
