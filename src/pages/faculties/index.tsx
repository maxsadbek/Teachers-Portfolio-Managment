import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { Pencil, Trash2, ImagePlus, X } from "lucide-react";
import { useMemo, useState, useRef } from "react";
import { Modal } from "@/components/modal/modal";
import { useModalActions, useModalIsOpen } from "@/store/modalStore";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { useForm } from "react-hook-form";

type FacultyFormValues = {
	name: string;
	image: FileList | null;
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

const columns: ColumnDef<Faculty>[] = [
	{
		accessorKey: "id",
		header: "#",
		cell: ({ row }) => <span className="text-muted-foreground ">{row.getValue("id")}</span>,
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
		header: "Fakultet",
		cell: ({ row }) => <span className="font-medium">{row.getValue("name")}</span>,
	},
	{
		accessorKey: "actions",
		header: () => <div className="text-center">Amallar</div>,
		cell: () => (
			<div className="flex justify-center items-center gap-2">
				<button
					type="button"
					className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
				>
					<Pencil className="size-3" />
					Tahrirlash
				</button>
				<button
					type="button"
					className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
				>
					<Trash2 className="size-3" />
					O'chirish
				</button>
			</div>
		),
	},
];

export default function Faculties() {
	const [search, setSearch] = useState("");
	const isOpen = useModalIsOpen();
	const { open, close } = useModalActions();
	const fileRef = useRef<HTMLInputElement>(null);

	const {
		register,
		handleSubmit,
		reset,
		watch,
		setValue,
		formState: { errors },
	} = useForm<FacultyFormValues>({
		defaultValues: { name: "", image: null },
	});
	const imageList = watch("image");
	const preview = useMemo(() => {
		const file = imageList?.[0];
		return file ? URL.createObjectURL(file) : null;
	}, [imageList]);
	const filtered = useMemo(
		() => FACULTIES.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
		[search],
	);

	const handleClose = () => {
		reset();
		if (fileRef.current) fileRef.current.value = "";
		close();
	};

	const onSubmit = (values: FacultyFormValues) => {
		console.log("Fakultet malumotlari", {
			name: values.name,
			image: values.image?.[0] ?? null,
		});
		handleClose();
	};

	const { ref: imageRef, ...imageRegister } = register("image");

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Fakultetlar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
				addLabel="Fakultet qo'shish"
			/>

			<DataTable columns={columns} data={filtered} />

			<Modal open={isOpen} onClose={handleClose} title="Fakultet qo'shish">
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<Label>Rasm</Label>
					<button
						type="button"
						onClick={() => fileRef.current?.click()}
						className="relative w-full h-36 rounded-xl border-2 border-dashed border-muted-foreground/30 hover:border-primary/50 flex flex-col items-center justify-center gap-2 transition-colors bg-muted/20 cursor-pointer"
					>
						{preview ? (
							<>
								<img src={preview} className="w-full h-full object-cover rounded-xl" alt="preview" />
								<button
									type="button"
									onClick={(e) => {
										e.stopPropagation();
										setValue("image", null);
										if (fileRef.current) fileRef.current.value = "";
									}}
									className="absolute top-2 right-2 bg-black/50 text-white rounded-full p-0.5 hover:bg-black/70"
								>
									<X className="size-3" />
								</button>
							</>
						) : (
							<>
								<ImagePlus className="size-8 text-muted-foreground/50" />
								<span className="text-[13px] text-muted-foreground ">Rasm yuklash uchun bosing</span>
							</>
						)}
						<input
							type="file"
							accept="image/*"
							className="hidden"
							{...imageRegister}
							ref={(el) => {
								imageRef(el);
								fileRef.current = el;
							}}
						/>
					</button>
					<div className="flex flex-col gap-2">
						<Label htmlFor="faculty-name">Fakultet nomi</Label>
						<Input
							id="faculty-name"
							placeholder="Masalan: Davolash fakulteti"
							{...register("name", { required: "Fakultet nomi kiritilishi shart" })}
						/>
						{errors.name && <span className="text-[12px] text-red-500">{errors.name.message}</span>}
					</div>

					<div className="flex justify-end gap-2">
						<Button type="button" variant="outline" onClick={handleClose}>
							Bekor qilish
						</Button>
						<Button type="submit">{"Qo'shish"}</Button>
					</div>
				</form>
			</Modal>
		</div>
	);
}
