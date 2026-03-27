import { useState } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";
import { EditTeacherDTO } from "@/features/teacher/teacher.type";

export const useTeacherEdit = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const edit = async (id: number, data: EditTeacherDTO) => {
		setLoading(true);
		setError(null);
		try {
			const response = await TeacherService.edit(id, data);
			return response.data;
		} catch (err: any) {
			setError(err?.response?.data?.message || "Tahrirlashda xatolik");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { edit, loading, error };
};
