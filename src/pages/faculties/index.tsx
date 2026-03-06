import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm } from "react-hook-form";

type FacultyFormValues = {
	name: string;
	image: File | null;
};

type Faculty = {
	id: number;
	name: string;
	image: string | null;
};

const FACULTIES: Faculty[] = [
	{ id: 1, name: "Davolash fakulteti", image: null },
	{ id: 2, name: "Pediatriya fakulteti", image: null },
	{ id: 3, name: "Stomatologiya va Farmatsiya fakulteti", image: null },
	{ id: 4, name: "Tibbiy profilaktika fakulteti", image: null },
	{ id: 5, name: "Tibbiy biologiya fakulteti", image: null },
	{ id: 6, name: "Oliy hamshiralik ishi fakulteti", image: null },
	{ id: 7, name: "Magistratura va doktorantura", image: null },
];

function createColumns(
	onEdit: (row: Faculty) => void,
	onDelete: (row: Faculty) => void,
): ColumnDef<Faculty>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }) => (
				<span className="text-muted-foreground">{row.getValue("id")}</span>
			),
		},
		{
			accessorKey: "image",
			header: "Rasm",
			cell: ({ row }) => (
				<div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[13px]">
					{row.original.name.charAt(0).toUpperCase()}
				</div>
			),
		},
		{
			accessorKey: "name",
			header: "Fakultet",
			cell: ({ row }) => (
				<span className="font-medium">{row.getValue("name")}</span>
			),
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex items-center justify-center gap-2">
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

export default function Faculties() {
	const [search, setSearch] = useState("");
	const isOpen = useModalIsOpen();
	const editData = useModalEditData() as Faculty | null;
	const { open, close } = useModalActions();
	const isEdit = editData !== null;

	const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FacultyFormValues>({
		defaultValues: { name: "", image: null },
	});

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name, image: null });
		}
	}, [editData, reset]);

	const filtered = useMemo(
		() => FACULTIES.filter((f) =>
			f.name.toLowerCase().includes(search.toLowerCase()),
		),
		[search],
	);

	const columns = useMemo(
		() => createColumns(
			(row) => open(row),
			(row) => console.log("O'chirish:", row),
		),
		[open],
	);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = (values: FacultyFormValues) => {
		if (isEdit) {
			console.log("Fakultet tahrirlandi:", { id: editData.id, ...values });
		} else {
			console.log("Yangi fakultet:", values);
		}
		handleClose();
	};

	return (
		<div className="flex flex-col gap-4 dark:text-white">
			<TableToolbar
				countLabel="Fakultetlar soni"
				count={FACULTIES.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
				addLabel="Fakultet qo'shish"
			/>

			<DataTable columns={columns} data={filtered} />

			<Modal
				open={isOpen}
				onClose={handleClose}
				title={isEdit ? "Fakultet tahrirlash" : "Fakultet qo'shish"}
			>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2 dark:text-white">
					<div className="flex flex-col gap-2">
						<Label className="dark:text-white">Rasm</Label>
						<Controller
							name="image"
							control={control}
							render={({ field }) => (
								<FileInput type="image" value={field.value} onChange={field.onChange} className="dark:text-white"/>
							)}
						/>
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="faculty-name" >Fakultet nomi</Label>
						<Input
							id="faculty-name"
							placeholder="Masalan: Davolash fakulteti"
							{...register("name", { required: "Fakultet nomi kiritilishi shart" })}
						/>
						{errors.name && (
							<span className="text-[12px] text-red-500">{errors.name.message}</span>
						)}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose} className="dark:text-white">Bekor qilish</Button>
						<Button type="submit">{isEdit ? "Saqlash" : "Qo'shish"}</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
