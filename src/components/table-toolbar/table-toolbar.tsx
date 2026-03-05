import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Plus, Search } from "lucide-react";

type TableToolbarProps = {
	count?: number;
	countLabel?: string;
	searchValue: string;
	onSearchChange: (value: string) => void;
	onAdd?: () => void;
	addLabel?: string;
};

export function TableToolbar({ onSearchChange, searchValue, addLabel, count, countLabel, onAdd }: TableToolbarProps) {
	return (
		<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between  gap-3">
			{countLabel !== undefined && (
				<div className="flex items-center gap-2">
					<span className="text-[14px] font-semibold text-foreground">{countLabel}</span>
					<span className="bg-primary/10 text-primary text-[13px] font-bold px-2.5 py-0.5 rounded-full">
						{count ?? 0}
					</span>
				</div>
			)}

			<div className="flex items-center gap-2 w-full sm:w-auto">
				<div className="relative flex-1 sm:w-64">
					<Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
					<Input
						placeholder="Qidirish..."
						value={searchValue}
						onChange={(e) => onSearchChange(e.target.value)}
						className="pl-8 h-9"
					/>
				</div>

				{onAdd && (
					<Button onClick={onAdd} size="sm" className="h-9 gap-1.5 shrink-0">
						{addLabel}
					</Button>
				)}
			</div>
		</div>
	);
}
