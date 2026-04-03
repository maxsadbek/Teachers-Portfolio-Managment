import { useState, useEffect, useCallback } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";
import { Teacher } from "@/features/teacher/teacher.type";
import { useDebounce } from "@/hooks/teachers/useDebounce";

export interface TeacherListParams {
	search?: string;
	departmentId?: number;
	positionId?: number;
}

export const useTeacherList = (params?: TeacherListParams) => {
	const [allData, setAllData] = useState<Teacher[]>([]);
	const [totalElements, setTotalElements] = useState(0);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [page, setPage] = useState(0);
	const [size] = useState(100);

	const debouncedSearch = useDebounce(params?.search, 500);

	const fetchTeachers = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const res = await TeacherService.getAll(page, size, { search: debouncedSearch });
			const raw = res.data as any;

			const body: Teacher[] = Array.isArray(raw?.data?.body) ? raw.data.body : Array.isArray(raw?.body) ? raw.body : [];
			const total: number = raw?.data?.totalElements ?? raw?.totalElements ?? body.length;

			setAllData(body);
			setTotalElements(total);
		} catch (err: any) {
			setError(err?.response?.data?.message ?? "Xatolik yuz berdi");
		} finally {
			setLoading(false);
		}
	}, [page, size, debouncedSearch]); 

	useEffect(() => {
		fetchTeachers();
	}, [fetchTeachers]);

	const data = (() => {
		let filtered = allData;

		if (params?.departmentId) {
			filtered = filtered.filter((t) => (t as any).departmentId === params.departmentId);
		}

		if (params?.positionId) {
			filtered = filtered.filter(
				(t) => (t as any).lavozmId === params.positionId || (t as any).lavozimId === params.positionId,
			);
		}

		return filtered;
	})();

	return { data, totalElements, loading, error, page, setPage, refetch: fetchTeachers };
};
