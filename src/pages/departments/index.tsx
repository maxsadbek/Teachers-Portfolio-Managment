import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { SearchableSelect } from "@/components/searchable-select/searchable-select";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalIsOpen, useModalEditData } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type DepartmentFormValues = {
	name: string;
	facultyId: string;
	image: File | null;
};

type Department = {
	id: number;
	name: string;
	faculty: string;
	image: string | null;
};

function createColumns(
	onEdit: (row: Department) => void,
	onDelete: (row: Department) => void,
): ColumnDef<Department>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => <span className="text-muted-foreground">{row.getValue("id")}</span>,
		},
		{
			accessorKey: "image",
			header: "Rasm",
			cell: ({ row }) => {
				const name = row.original.name;
				return (
					<div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[13px]">
						{name.charAt(0).toUpperCase()}
					</div>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Kafedra",
			cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
		},
		{
			accessorKey: "faculty",
			header: "Fakulteti",
			cell: ({ row }) => <span className="font-medium">{row.getValue("faculty")}</span>,
		},
		{
			accessorKey: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
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

export default function Departments() {
	const isOpen = useModalIsOpen();
	const [search, setSearch] = useState("");
	const { open, close } = useModalActions();
	const editData = useModalEditData() as Department | null;
	const isEdit = editData !== null;

	// Bo'sh massivlar (API dan kelishi kerak)
	const [departments, setDepartments] = useState<Department[]>([]);
	const [faculties, setFaculties] = useState<{ value: string; label: string }[]>([]);

	const filtered = useMemo(
		() =>
			departments.filter(
				(d) =>
					d.name.toLowerCase().includes(search.toLowerCase()) || d.faculty.toLowerCase().includes(search.toLowerCase()),
			),
		[search, departments],
	);

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<DepartmentFormValues>({
		defaultValues: { name: "", facultyId: "", image: null },
	});

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(row) => console.log("O'chirish:", row),
			),
		[open],
	);

	const handleClose = () => {
		reset();
		close();
	};

	useEffect(() => {
		if (editData) {
			const faculty = faculties.find((f) => f.label === editData.faculty);
			reset({ name: editData.name, facultyId: faculty?.value ?? "", image: null });
		}
	}, [editData, reset, faculties]);

	const onSubmit = (values: DepartmentFormValues) => {
		if (isEdit) {
			console.log("Tahrirlandi:", values);
		} else {
			console.log("Qo'shildi:", values);
		}
		handleClose();
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Kafedralar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
				addLabel="Kafedra qo'shish"
			/>

			<DataTable columns={columns} data={filtered} />

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Kafedrani tahrirlash" : "Kafedra qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label>Rasm</Label>
						<Controller
							name="image"
							control={control}
							render={({ field }) => <FileInput type="image" value={field.value} onChange={field.onChange} />}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label>Fakultet</Label>
						<Controller
							name="facultyId"
							control={control}
							rules={{ required: "Fakultet tanlanishi shart" }}
							render={({ field }) => (
								<SearchableSelect
									options={faculties}
									value={field.value}
									onChange={field.onChange}
									placeholder="Fakultetni tanlang"
									searchPlaceholder="Fakultet qidirish..."
								/>
							)}
						/>
						{errors.facultyId && <span className="text-[12px] text-red-500">{errors.facultyId.message}</span>}
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="department-name">Kafedra nomi</Label>
						<Input
							id="department-name"
							placeholder="Masalan: Kompyuter kafedrasi"
							{...register("name", { required: "Kafedra nomi kiritilishi shart" })}
						/>
						{errors.name && <span className="text-[12px] text-red-500">{errors.name.message}</span>}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button type="submit">{isEdit ? "Saqlash" : "Qo'shish"}</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
