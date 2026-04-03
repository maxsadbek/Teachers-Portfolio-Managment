import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";
import { useMemo, useCallback, useState } from "react";
import { useNavigate } from "react-router";
import type { Teacher } from "../../features/teacher/teacher.type";
import { useTeacherSheetActions } from "@/store/teacherSheet";
import { TeacherSheet } from "./teacher-sheet";
import { useTeacherList } from "../../hooks/teachers/useTeacherList";
import { useTeacherDelete } from "../../hooks/teachers/useTeacherDelete";
import { toast } from "sonner";
import { DEPARTMENTS, POSITIONS } from "./data";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/ui/select";
import { useDebounce } from "@/hooks/teachers/useDebounce";

function createColumns(onEdit: (row: Teacher) => void, onDelete: (row: Teacher) => void): ColumnDef<Teacher>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("id")}</span>,
		},
		{
			accessorKey: "fullName",
			header: "F.I.Sh.",
			cell: ({ row }) => (
				<div className="flex items-center gap-2.5">
					<div className="w-8 h-8 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold text-[13px] shrink-0">
						{(row.getValue("fullName") as string).charAt(0).toUpperCase()}
					</div>
					<span className="font-medium text-[13px]">{row.getValue("fullName")}</span>
				</div>
			),
		},
		{
			accessorKey: "phoneNumber",
			header: "Telefon",
			cell: ({ row }) => <span className="text-muted-foreground text-[13px]">{row.getValue("phoneNumber")}</span>,
		},
		{
			accessorKey: "lavozim",
			header: "Lavozim",
			cell: ({ row }) => (
				<span className="inline-flex items-center bg-blue-50 text-blue-700 text-[12px] font-medium px-2 py-0.5 rounded-full">
					{row.getValue("lavozim")}
				</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2" onClick={(e) => e.stopPropagation()}>
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
					>
						<Pencil className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original)}>
						<button
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors cursor-pointer"
						>
							<Trash2 className="size-3" />
							O'chirish
						</button>
					</ConfirmPopover>
				</div>
			),
		},
	];
}

export default function Teachers() {
	const { open } = useTeacherSheetActions();
	const navigate = useNavigate();
	const { remove, loading: deleteLoading } = useTeacherDelete();

	const [search, setSearch] = useState("");
	const [departmentId, setDepartmentId] = useState<string>("all");
	const [positionId, setPositionId] = useState<string>("all");

	const debouncedSearch = useDebounce(search, 500);

	const { data, totalElements, loading, refetch } = useTeacherList({
		search: debouncedSearch || undefined,
		departmentId: departmentId !== "all" ? Number(departmentId) : undefined,
		positionId: positionId !== "all" ? Number(positionId) : undefined,
	});

	const handleDelete = useCallback(async (row: Teacher) => {
		try {
			await remove(row.id);
			toast.success("O'qituvchi o'chirildi");
			refetch();
		} catch {
			toast.error("O'chirishda xatolik yuz berdi");
		}
	}, [remove, refetch]);

	const handleEdit = useCallback((row: Teacher) => {
		open(row);
	}, [open]);

	const columns = useMemo(() => createColumns(handleEdit, handleDelete), [handleEdit, handleDelete]);

	return (
		<div className="flex flex-col gap-4">
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-semibold text-foreground">O'qituvchilar soni:</span>
					<span className="bg-primary/10 text-primary text-[13px] font-bold px-2.5 py-0.5 rounded-full">
						{totalElements}
					</span>
				</div>
				<Button size="sm" className="h-9 gap-1.5" onClick={() => open()}>
					<Plus className="size-4" />
					O'qituvchi qo'shish
				</Button>
			</div>

			{/* Toolbar */}
			<div className="flex items-center gap-2">
				<div className="relative flex-1">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
					<Input
						placeholder="Ism bo'yicha qidirish..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="pl-9 h-9 text-[13px]"
					/>
				</div>

				<Select value={departmentId} onValueChange={setDepartmentId}>
					<SelectTrigger className="h-9 w-[200px] text-[13px]">
						<SelectValue placeholder="Kafedra bo'yicha" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Kafedra bo'yicha</SelectItem>
						{DEPARTMENTS.map((d) => (
							<SelectItem key={d.value} value={d.value}>
								{d.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>

				<Select value={positionId} onValueChange={setPositionId}>
					<SelectTrigger className="h-9 w-[180px] text-[13px]">
						<SelectValue placeholder="Lavozim bo'yicha" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="all">Lavozim bo'yicha</SelectItem>
						{POSITIONS.map((p) => (
							<SelectItem key={p.value} value={p.value}>
								{p.label}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</div>

			<DataTable
				columns={columns}
				data={data}
				isLoading={loading || deleteLoading}
				onRowClick={(row) => navigate(`/teachers/${row.id}`)}
			/>

			<TeacherSheet onSuccess={refetch} />
		</div>
	);
}
