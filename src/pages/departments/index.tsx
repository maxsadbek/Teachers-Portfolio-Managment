import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

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

const FACULTIES = [
	{ value: "1", label: "Davolash fakulteti" },
	{ value: "2", label: "Pediatriya fakulteti" },
	{ value: "3", label: "Stomatologiya va Farmatsiya fakulteti" },
	{ value: "4", label: "Tibbiy profilaktika fakulteti" },
	{ value: "5", label: "Tibbiy biologiya fakulteti" },
	{ value: "6", label: "Oliy hamshiralik ishi fakulteti" },
	{ value: "7", label: "Magistratura va doktorantura" },
];

const DEPARTMENTS: Department[] = [
	{ id: 1, name: "Farmatsiya va kimyo kafedrasi", faculty: "Stomatologiya va Farmatsiya fakulteti", image: null },
	{ id: 2, name: "Ichki kasalliklar kafedrasi", faculty: "Davolash fakulteti", image: null },
	{ id: 3, name: "Jarrohlik kafedrasi", faculty: "Davolash fakulteti", image: null },
	{ id: 4, name: "Bolalar kasalliklari kafedrasi", faculty: "Pediatriya fakulteti", image: null },
	{ id: 5, name: "Stomatologiya kafedrasi", faculty: "Stomatologiya va Farmatsiya fakulteti", image: null },
	{ id: 6, name: "Akusherlik va ginekologiya", faculty: "Tibbiy profilaktika fakulteti", image: null },
	{ id: 7, name: "Nevrologiya kafedrasi", faculty: "Davolash fakulteti", image: null },
	{ id: 8, name: "Biokimyo kafedrasi", faculty: "Tibbiy biologiya fakulteti", image: null },
	{ id: 9, name: "Fiziologiya kafedrasi", faculty: "Tibbiy biologiya fakulteti", image: null },
	{ id: 10, name: "Hamshiralik ishi kafedrasi", faculty: "Oliy hamshiralik ishi fakulteti", image: null },
	{ id: 11, name: "Umumiy gigiyena kafedrasi", faculty: "Tibbiy profilaktika fakulteti", image: null },
	{ id: 12, name: "Tibbiy biologiya kafedrasi", faculty: "Magistratura va doktorantura", image: null },
];

const columns: ColumnDef<Department>[] = [
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

export default function Departments() {
	const [search, setSearch] = useState("");
	const filtered = useMemo(
		() =>
			DEPARTMENTS.filter(
				(d) =>
					d.name.toLowerCase().includes(search.toLowerCase()) || d.faculty.toLowerCase().includes(search.toLowerCase()),
			),
		[search],
	);

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Kafedralar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => alert("Kafedra qo'shish")}
				addLabel="Kafedra qo'shish"
			/>

			<DataTable columns={columns} data={filtered} />
		</div>
	);
}
