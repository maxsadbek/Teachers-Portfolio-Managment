import { useState } from "react";
import { TeacherService } from "@/features/teacher/teacher.service";
import { CreateTeacherDTO } from "@/features/teacher/teacher.type";

export const useTeacherCreate = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const create = async (data: CreateTeacherDTO) => {
		setLoading(true);
		setError(null);
		try {
			const response = await TeacherService.create(data);
			return response.data;
		} catch (err: any) {
      setError(err?.response?.data?.message || "Xatolik yuz berdi")
      throw err;
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
};
