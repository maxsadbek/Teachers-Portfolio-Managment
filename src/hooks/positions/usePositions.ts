import { useEffect, useState } from "react";
import { PositionService } from "../../features/positions/position.service";

type Position = {
	id: number;
	name: string;
	count: number;
};

export function usePositions() {
	const [positions, setPositions] = useState<Position[]>([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	async function fetchPositions() {
		setLoading(true);
		try {
			const res = await PositionService.getAll();
			const data = res.data?.data ?? res.data ?? [];
			setPositions(Array.isArray(data) ? data : []);
		} catch {
			setError("Ma'lumotlarni yuklashda xatolik");
			setPositions([]);
		} finally {
			setLoading(false);
		}
	}

	async function createPosition(name: string) {
		await PositionService.create({ name });
		await fetchPositions();
	}

	async function updatePosition(id: number, name: string) {
		await PositionService.update(id, { name });
		await fetchPositions();
	}

	async function removePosition(id: number) {
		await PositionService.remove(id);
		await fetchPositions();
	}

	useEffect(() => {
		fetchPositions();
	}, []);

	return {
		positions,
		loading,
		error,
		createPosition,
		updatePosition,
		removePosition,
		refetch: fetchPositions,
	};
}
