import { useState, useEffect, useCallback } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";
import { Teacher } from "@/features/teacher/teacher.type";

export interface TeacherListParams {
	search?: string;
	departmentId?: number;
	positionId?: number;
}

export const useTeacherList = (params?: TeacherListParams) => {
	const [data, setData] = useState<Teacher[]>([]);
	const [totalElements, setTotalElements] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [size] = useState(10);

	const search = params?.search;
	const departmentId = params?.departmentId;
	const positionId = params?.positionId;

	const fetchTeachers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await TeacherService.getAll(page, size, { search, departmentId, positionId });
			setData(res.data.body);
			setTotalElements(res.data.totalElements);
		} catch (err: any) {
			setError(err?.response?.data?.message ?? "Xatolik yuz berdi");
		} finally {
			setLoading(false);
		}
	}, [page, size, search, departmentId, positionId]);

	useEffect(() => {
		fetchTeachers();
	}, [fetchTeachers]);

	return {
		data,
		totalElements,
		loading,
		error,
		page,
		setPage,
		refetch: fetchTeachers,
	};
};
