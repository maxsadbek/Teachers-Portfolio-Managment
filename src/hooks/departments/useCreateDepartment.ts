import { departmentService } from "@/features/departments/departments.service";
import { fileService } from "@/features/file/file.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateDepartmentInput {
	name: string;
	image: File;
	collegeId: number;
}

export function useCreateDepartment() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (input: CreateDepartmentInput) => {
			const imgUrl = await fileService.uploadImage(input.image);

			return departmentService.create({
				name: input.name,
				collegeId: input.collegeId,
				imgUrl,
			});
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["department"] });
			toast.success("Kafedra muvaffaqiyatli qo'shildi!", {
				position: "bottom-right",
			});
		},
		onError: (error: any) => {
			toast.error(error?.message || "Kafedra qo'shishda xatolik");
		},
	});
}
