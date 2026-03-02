import { Card, CardContent } from "@/ui/card";
import { cn } from "@/utils";
import type { ReactNode } from "react";

export type DataTableColumn<T> = {
	key: keyof T | string;
	label: string;
	align?: "left" | "right" | "center";
	render?: (row: T) => ReactNode;
};

type DataTableProps<T> = {
	columns: DataTableColumn<T>[];
	data: T[];
	striped?: boolean;
	className?: string;
};

export function DataTable<T extends Record<string, any>>({
	columns,
	data,
	striped = true,
	className,
}: DataTableProps<T>) {
	return (
		<Card className={cn("overflow-hidden", className)}>
			<CardContent className="p-0">
				<div className="overflow-x-auto">
					<table className="w-full text-[13px]">
						<thead>
							<tr className="border-b bg-muted/40">
								{columns.map((col) => (
									<th
										key={String(col.key)}
										className={cn(
											"px-4 py-3 font-semibold text-muted-foreground",
											col.align === "right" && "text-right",
											col.align === "center" && "text-center",
											!col.align && "text-left",
										)}
									>
										{col.label}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((row, i) => (
								<tr
									key={i as any}
									className={cn(
										"border-b last:border-0 hover:bg-muted/20 transition-colors",
										striped && i % 2 !== 0 && "bg-muted/10",
									)}
								>
									{columns.map((col) => (
										<td
											key={String(col.key)}
											className={cn(
												"px-4 py-3",
												col.align === "right" && "text-right",
												col.align === "center" && "text-center",
											)}
										>
											{col.render ? col.render(row) : row[col.key as keyof T]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</CardContent>
		</Card>
	);
}
