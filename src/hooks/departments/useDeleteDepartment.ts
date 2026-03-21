import { departmentService } from "../../features/departments/departments.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function useDeleteDepartment() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (id: number) => departmentService.remove(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["department"] });
			toast.success("Kafedra o'chirildi");
		},
	});
}
