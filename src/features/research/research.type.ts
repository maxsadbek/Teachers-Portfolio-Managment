export type ResearchItem = {
	id: number;
	name: string;
	description: string;
	year: number;
	fileUrl: string;
	userId: number;
	member: boolean;
	univerName: string;
	finished: boolean;
	memberEnum: "MILLIY" | "XALQARO";
};

export type ResearchCreateDto = {
	name: string;
	description: string;
	year: number;
	fileUrl?: string;
	univerName: string;
	member: boolean;
	memberEnum: "MILLIY" | "XALQARO";
	finished: boolean;
};

export type ResearchUpdateDto = Partial<ResearchCreateDto>;

export interface PagedResponse<T> {
	success: boolean;
	message: string;
	data: {
		page: number;
		size: number;
		totalPage: number;
		totalElements: number;
		body: T[];
	};
}

export type ResearchByUserResponse = PagedResponse<ResearchItem>;
export type ResearchListResponse = PagedResponse<ResearchItem>;
