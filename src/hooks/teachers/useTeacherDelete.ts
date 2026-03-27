import { useState } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";

export const useTeacherDelete = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const remove = async (id: number) => {
		setLoading(true);
		setError(null);
		try {
			const response = await TeacherService.remove(id);
			return response.data;
		} catch (err: any) {
			setError(err?.response?.data?.message || "O'chirishda xatolik");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { remove, loading, error };
};
