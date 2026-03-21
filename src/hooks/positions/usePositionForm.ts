import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useModalActions, useModalEditData } from "@/store/modalStore";

type Position = { id: number; name: string; count: number };
type PositionFormValues = { name: string };

type Props = {
	onCreate: (name: string) => Promise<void>;
	onUpdate: (id: number, name: string) => Promise<void>;
};

export function usePositionForm({ onCreate, onUpdate }: Props) {
	const { close } = useModalActions();
	const editData = useModalEditData() as Position | null;
	const isEdit = editData !== null;

	const form = useForm<PositionFormValues>({
		defaultValues: { name: "" },
	});

	useEffect(() => {
		form.reset({ name: editData?.name ?? "" });
	}, [editData]);

	async function onSubmit(values: PositionFormValues) {
		if (isEdit) {
			await onUpdate(editData.id, values.name);
		} else {
			await onCreate(values.name);
		}
		close();
	}

	return { form, onSubmit: form.handleSubmit(onSubmit), isEdit, editData };
}
