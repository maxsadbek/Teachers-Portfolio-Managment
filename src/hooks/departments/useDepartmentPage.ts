import { departmentService } from "@/features/departments/departments.service";
import { DepartmentPageParams } from "@/features/departments/departments.type";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentPage(params: DepartmentPageParams) {
	return useQuery({
		queryKey: ["department", "page", params],
		queryFn: () => departmentService.getPage(params),
	});
}
