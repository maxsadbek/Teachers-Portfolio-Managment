export interface PositionResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

export interface PositionDTO {
	name?: string;
}
