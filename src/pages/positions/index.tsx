import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { Card, CardContent } from "@/ui/card";
import { Pencil, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useModalActions, useModalIsOpen, useModalEditData } from "@/store/modalStore";
import { Modal } from "@/components/modal/modal";
import { Button } from "@/ui/button";
import { useForm } from "react-hook-form";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";

type Position = {
	id: number;
	name: string;
	count: number;
};

type PositionFormValues = {
	name: string;
};

export default function Positions() {
	const [search, setSearch] = useState("");
	const [positions, setPositions] = useState<Position[]>([]); // Mock data o'rniga state
	const isOpen = useModalIsOpen();
	const { close, open } = useModalActions();
	const editData = useModalEditData() as Position | null;
	const isEdit = editData !== null;

	const filtered = useMemo(
		() => positions.filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
		[search, positions],
	);

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<PositionFormValues>({
		defaultValues: { name: "" },
	});

	function handleClose() {
		close();
	}

	useEffect(() => {
		if (editData) {
			reset({ name: editData.name });
		} else {
			reset({ name: "" });
		}
	}, [editData, reset]);

	const onSubmit = (values: PositionFormValues) => {
		if (isEdit) {
			console.log("Lavozim tahrirlandi:", { id: editData.id, ...values });
		} else {
			console.log("Yangi lavozim:", values);
		}
		handleClose();
	};

	return (
		<div className="flex flex-col gap-4">
			<TableToolbar
				countLabel="Lavozimlar soni"
				count={filtered.length}
				searchValue={search}
				onSearchChange={setSearch}
				onAdd={() => open()}
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
										onClick={() => open(position)}
										className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
									>
										<Pencil className="size-3" />
										Tahrirlash
									</button>
									<ConfirmPopover onConfirm={() => console.log("O'chirish id:", position.id)}>
										<button
											type="button"
											className="inline-flex items-center gap-1.5 bg-red-50 text-red-700 hover:bg-red-100 text-[12px] font-semibold px-2 py-1 rounded-md transition-colors cursor-pointer"
										>
											<Trash2 className="size-3" />
											O'chirish
										</button>
									</ConfirmPopover>
								</div>
							</CardContent>
						</Card>
					))
				) : (
					<p className="col-span-full text-center text-muted-foreground py-10 text-[14px]">Ma'lumot topilmadi.</p>
				)}
			</div>

			<Modal open={isOpen} onClose={handleClose} title={isEdit ? "Lavozimni tahrirlash" : "Lavozim qo'shish"}>
				<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 py-2">
					<div className="flex flex-col gap-2">
						<Label htmlFor="position-name">Lavozim nomi</Label>
						<Input
							id="position-name"
							placeholder="Masalan: Professor"
							{...register("name", { required: "Lavozim nomi kiritilishi shart" })}
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
