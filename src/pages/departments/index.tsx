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
import { Pencil, Trash2, Loader2 } from "lucide-react";
import { useSearchParams } from "react-router";
import { useEffect, useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDepartmentPage } from "./../../hooks/departments/useDepartmentPage";
import { useCreateDepartment } from "../../hooks/departments/useCreateDepartment";
import { useUpdateDepartment } from "../../hooks/departments/useUpdateDepartment";
import { useDeleteDepartment } from "../../hooks/departments/useDeleteDepartment";

type DepartmentFormValues = {
	name: string;
	collegeId: string;
	image: File | null;
};

function createColumns(
	onEdit: (row: any) => void,
	onDelete: (id: number) => void,
	isDeleting: boolean,
): ColumnDef<any>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => <span className="text-muted-foreground">{row.original.id}</span>,
		},
		{
			accessorKey: "name",
			header: "Kafedra",
			cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
		},
		{
			accessorKey: "collegeName",
			header: "Fakulteti",
			cell: ({ row }) => <span className="font-medium">{row.original.collegeName}</span>,
		},
		{
			accessorKey: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors"
					>
						<Pencil className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original.id)}>
						<button
							disabled={isDeleting}
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors disabled:opacity-50"
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
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page")) || 1;
	const size = Number(searchParams.get("size")) || 10;
	const search = searchParams.get("search") || "";

	const isOpen = useModalIsOpen();
	const { open, close } = useModalActions();
	const editData = useModalEditData() as any;
	const isEdit = !!editData;
	const { data: pageData, isLoading } = useDepartmentPage({ page: page - 1, size, name: search });
	const { mutate: createDepartment, isPending: isCreating } = useCreateDepartment();
	const { mutate: updateDepartment, isPending: isUpdating } = useUpdateDepartment();
	const { mutate: deleteDepartment, isPending: isDeleting } = useDeleteDepartment();
	const faculties = [{ value: "1", label: "TATU" }];

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<DepartmentFormValues>();

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(id) => deleteDepartment(id),
				isDeleting,
			),
		[open, deleteDepartment, isDeleting],
	);

	useEffect(() => {
		if (editData) {
			reset({
				name: editData.name,
				collegeId: String(editData.collegeId),
				image: null,
			});
		} else {
			reset({ name: "", collegeId: "", image: null });
		}
	}, [editData, reset]);

	const onSubmit = (values: DepartmentFormValues) => {
		const payload = {
			name: values.name,
			collegeId: Number(values.collegeId),
			image: values.image as File,
		};

		if (isEdit) {
			updateDepartment({ id: editData.id, ...payload }, { onSuccess: handleClose });
		} else {
			createDepartment(payload, { onSuccess: handleClose });
		}
	};

	const handleClose = () => {
		reset();
		close();
	};

	const handleSearch = (val: string) => {
		setSearchParams({ page: "1", size: String(size), search: val });
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Kafedralar soni"
				count={pageData?.data.totalElements || 0}
				searchValue={search}
				onSearchChange={handleSearch}
				onAdd={() => open()}
				addLabel="Kafedra qo'shish"
			/>

			<DataTable
				columns={columns}
				data={pageData?.data.body || []}
				isLoading={isLoading}
				pagination={{
					pageCount: pageData?.data.totalPage || 0,
					pageIndex: page - 1,
					onPageChange: (p) => setSearchParams({ page: String(p + 1), size: String(size), search }),
					pageSize: size,
					onPageSizeChange: (s) => setSearchParams({ page: "1", size: String(s), search }),
				}}
			/>

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
							name="collegeId"
							control={control}
							rules={{ required: "Fakultet tanlanishi shart" }}
							render={({ field }) => (
								<SearchableSelect
									options={faculties}
									value={field.value}
									onChange={field.onChange}
									placeholder="Fakultetni tanlang"
								/>
							)}
						/>
						{errors.collegeId && <span className="text-[12px] text-red-500">{errors.collegeId.message}</span>}
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="department-name">Kafedra nomi</Label>
						<Input id="department-name" {...register("name", { required: "Kafedra nomi kiritilishi shart" })} />
						{errors.name && <span className="text-[12px] text-red-500">{errors.name.message}</span>}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button type="submit" disabled={isCreating || isUpdating}>
							{(isCreating || isUpdating) && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							{isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
