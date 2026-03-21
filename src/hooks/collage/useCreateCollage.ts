import { collageService } from "@/features/collage/collage.service";
import { CreateCollageDTO } from "@/features/collage/collage.type";
import { fileService } from "@/features/file/file.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface CreateCollageInput {
	name: string;
	image: File;
}
export function useCreateCollage() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: async (input: CreateCollageInput) => {
			const imgUrl = await fileService.uploadImage(input.image);
			return collageService.create({ name: input.name, imgUrl });
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["collages"] });
			queryClient.invalidateQueries({ queryKey: ["department"] });
			toast.success("Fakultet muvaffaqiyatli qo'shildi");
		},
		onError: (error: any) => {
			toast.error(error.message || "Fakultet qo'shishda xatolik"); 
		},
	});
}
