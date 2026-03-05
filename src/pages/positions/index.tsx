import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { Card, CardContent } from "@/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";

type Position = {
	id: number;
	name: string;
	count: number;
};

type PositionFormValues = {
	name: string;
};

const POSITIONS: Position[] = [
	{ id: 1, name: "Professor", count: 18 },
	{ id: 2, name: "Dotsent", count: 45 },
	{ id: 3, name: "Katta o'qituvchi", count: 97 },
	{ id: 4, name: "Assistent", count: 88 },
	{ id: 5, name: "O'qituvchi", count: 0 },
];

export default function Positions() {
	const [search, setSearch] = useState("");

	const filtered = useMemo(
		() => POSITIONS.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
		[search],
	);
	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Lavozimlar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => alert("Lavozim qo'shish")}
				addLabel="Lavozim qo'shish"
			/>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
				{filtered.length ? (
					filtered.map((position) => (
						<Card key={position.id} className="py-0">
							<CardContent className="flex flex-col gap-4 px-5 py-5">
								<div className="flex flex-col gap-0.5">
									<span className="text-[15px] font-semibold leading-tight">{position.name}</span>
									<span className="text-[12px] text-muted-foreground">{position.count} ta xodim</span>
								</div>
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
							</CardContent>
						</Card>
					))
				) : (
					<p className="col-span-full text-center text-muted-foreground py-10 text-[14px]">Ma'lumot topilmadi.</p>
				)}
			</div>
		</div>
	);
}
