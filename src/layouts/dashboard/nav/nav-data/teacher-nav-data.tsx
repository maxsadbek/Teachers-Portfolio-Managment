import { Icon } from "@/components/icon";
import type { NavProps } from "@/components/nav";

export const teacherNavData: NavProps["data"] = [
	{
		name: "Portfolio",
		items: [
			{
				title: "Bosh sahifa",
				path: "/teacher-dashboard",
				icon: <Icon icon="lucide:layout-dashboard" size={24} />,
			},
		],
	},
];
