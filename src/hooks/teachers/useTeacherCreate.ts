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
			const resData = response.data as any;

			if (resData?.success === false) {
				const msg = resData?.message || "Server xatolik qaytardi";
				setError(msg);
				throw new Error(msg);
			}

			return response.data;
		} catch (err: any) {
			const msg = err?.response?.data?.message || err?.message || "O'qituvchi qo'shishda xatolik yuz berdi";
			setError(msg);
			console.error("useTeacherCreate error:", {
				status: err?.response?.status,
				data: err?.response?.data,
				message: err?.message,
			});
			throw new Error(msg);
		} finally {
			setLoading(false);
		}
	};

	return { create, loading, error };
};
