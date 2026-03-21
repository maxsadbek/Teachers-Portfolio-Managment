import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { useCreateCollage } from "@/hooks/collage/useCreateCollage";
import { useCollage } from "@/hooks/collage/useCollage";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import type { Collage } from "@/features/collage/collage.type";
import { collageService } from "@/features/collage/collage.service";
import { toast } from "sonner";

type FacultyFormValues = {
	name: string;
	image: File | null;
};

function createColumns(
	onEdit: (row: Collage) => void,
	onDelete: (id: number) => void,
	pageIndex: number,
	pageSize: number,
): ColumnDef<Collage>[] {
	return [
		{
			accessorKey: "id",
			header: "#",
			cell: ({ row }: any) => <span className="text-muted-foreground">{pageIndex * pageSize + row.index + 1}</span>,
		},
		{
			accessorKey: "imgUrl",
			header: "Rasm",
			cell: ({ row }) => {
				const imgUrl = row.original.imgUrl;
				return imgUrl ? (
					<img src={imgUrl} alt={row.original.name} className="w-9 h-9 rounded-full object-cover" />
				) : (
					<div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-[13px]">
						{row.original.name?.charAt(0).toUpperCase() || "F"}
					</div>
				);
			},
		},
		{
			accessorKey: "name",
			header: "Fakultet",
			cell: ({ row }) => <span className="font-medium">{row.original.name}</span>,
		},
		{
			id: "actions",
			header: () => <div className="text-center">Amallar</div>,
			cell: ({ row }) => (
				<div className="flex justify-center items-center gap-2">
					<button
						type="button"
						onClick={() => onEdit(row.original)}
						className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors"
					>
						<Pencil className="size-3" />
						Tahrirlash
					</button>
					<ConfirmPopover onConfirm={() => onDelete(row.original.id)}>
						<button
							type="button"
							className="inline-flex items-center gap-1.5 bg-red-50 text-red-600 hover:bg-red-100 text-[12px] font-semibold px-2.5 py-1 rounded-md transition-colors"
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
	const [searchParams, setSearchParams] = useSearchParams();
	const page = Number(searchParams.get("page") ?? "0");
	const size = 10;
	const search = searchParams.get("name") ?? "";

	const isOpen = useModalIsOpen();
	const editData = useModalEditData() as Collage | null;
	const { open, close } = useModalActions();
	const isEdit = !!editData;

	const { mutate: createCollage, isPending: isCreating } = useCreateCollage();
	const { data: response, isLoading, refetch } = useCollage();

	const faculties = response?.data ?? [];
	const totalElements = response?.data?.length || 0;

	const {
		register,
		handleSubmit,
		reset,
		control,
		formState: { errors },
	} = useForm<FacultyFormValues>({
		defaultValues: { name: "", image: null },
	});

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name, image: null });
		} else {
			reset({ name: "", image: null });
		}
	}, [editData, reset]);

	const handleDelete = async (id: number) => {
		try {
			await collageService.remove(id);
			toast.success("Fakultet o'chirildi");
			refetch();
		} catch (err) {
			toast.error("O'chirishda xatolik");
		}
	};

	const columns = useMemo(
		() =>
			createColumns(
				(row) => open(row),
				(id) => handleDelete(id),
				page,
				size,
			),
		[open, page, size],
	);

	const handleClose = () => {
		reset();
		close();
	};

	const onSubmit = async (values: FacultyFormValues) => {
		try {
			if (isEdit && editData) {
				await collageService.edit(editData.id, {
					name: values.name,
					image: values.image,
				} as any);
				toast.success("Fakultet yangilandi");
			} else {
				if (!values.image) {
					toast.error("Rasm yuklash shart");
					return;
				}
				createCollage({ name: values.name, image: values.image });
			}
			handleClose();
			refetch();
		} catch (error) {
			toast.error("Xatolik yuz berdi");
		}
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Fakultetlar soni"
				count={totalElements}
				searchValue={search}
				onSearchChange={(val) => setSearchParams({ name: val, page: "0" })}
				onAdd={() => open()}
				addLabel="Fakultet qo'shish"
			/>

			<DataTable columns={columns} data={faculties} isLoading={isLoading} />

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Fakultet tahrirlash" : "Fakultet qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label>Rasm</Label>
						<Controller
							name="image"
							control={control}
							rules={{ required: !isEdit && "Rasm tanlanishi shart" }}
							render={({ field }) => <FileInput type="image" value={field.value} onChange={field.onChange} />}
						/>
						{errors.image && <span className="text-xs text-red-500">{errors.image.message}</span>}
					</div>

					<div className="flex flex-col gap-2">
						<Label htmlFor="faculty-name">Fakultet nomi</Label>
						<Input
							id="faculty-name"
							placeholder="Masalan: Davolash fakulteti"
							{...register("name", { required: "Fakultet nomi kiritilishi shart" })}
						/>
						{errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button type="submit" disabled={isCreating}>
							{isEdit ? "Saqlash" : "Qo'shish"}
						</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
