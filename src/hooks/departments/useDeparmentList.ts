import { departmentService } from "@/features/departments/departments.service";
import { useQuery } from "@tanstack/react-query";

export function useDepartmentList() {
  return useQuery({
    queryKey:["department", "list"],
    queryFn: ()=> departmentService.getList(),
  })
}
