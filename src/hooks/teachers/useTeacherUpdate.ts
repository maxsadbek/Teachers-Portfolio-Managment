import { useState } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";
import { UpdateTeacherProfileDTO } from "@/features/teacher/teacher.type";

export const useTeacherUpdate = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const update = async (data: UpdateTeacherProfileDTO) => {
		setLoading(true);
		setError(null);
		try {
			const response = await TeacherService.updateProfile(data);
			return response.data;
		} catch (err: any) {
			setError(err?.response?.data?.message || "Yangilashda xatolik");
			throw err;
		} finally {
			setLoading(false);
		}
	};

	return { update, loading, error };
};
