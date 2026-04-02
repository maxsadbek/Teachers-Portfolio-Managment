export type NazoratItem = {
	id: number;
	name: string;
	description: string;
	year: number;
	fileUrl: string;
	userId: number;
	researcherName: string;
	univerName: string;
	level: "quyi" | "o'rta" | "yuqori";
	memberEnum: "MILLIY" | "XALQARO";
	finished: boolean;
	member?: boolean;
};

export type NazoratCreateDto = {
	name: string;
	description: string;
	year: number;
	fileUrl?: string;
	researcherName: string;
	univerName: string;
	level: "quyi" | "o'rta" | "yuqori";
	memberEnum: "MILLIY" | "XALQARO";
	finished: boolean;
	member?: boolean;
};

export type NazoratUpdateDto = Partial<NazoratCreateDto>;

export interface NazoratPagedResponse {
	success: boolean;
	message: string;
	data: {
		page: number;
		size: number;
		totalPage: number;
		totalElements: number;
		body: NazoratItem[];
	};
}
