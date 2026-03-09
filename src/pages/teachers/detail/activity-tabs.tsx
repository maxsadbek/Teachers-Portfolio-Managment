import { Award, BookText, FlaskConical, Plus, Star, TrendingUp, Users } from "lucide-react";
import { Button } from "@/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/ui/tabs";
import { cn } from "@/utils";
import { ResearchesTab } from "./detail-tabs/researches-tab";
import { PublicationsTab } from "./detail-tabs/publications-tab";
import { NashrlarTab } from "./detail-tabs/nashrlar-tab";
import { MaslahatTab } from "./detail-tabs/maslahat-tab";
// ─── EmptyState ────────────────────────────────────────────────────────────────
type EmptyStateProps = {
	icon: React.ReactNode;
	title: string;
	description: string;
};

function EmptyState({ icon, title, description }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center py-12 sm:py-16 gap-4">
			<div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-muted flex items-center justify-center text-muted-foreground">
				{icon}
			</div>
			<div className="text-center px-4">
				<p className="font-medium text-sm">{title}</p>
				<p className="text-[12px] text-muted-foreground mt-1">{description}</p>
			</div>
			<Button size="sm" variant="outline" className="gap-1.5">
				<Plus className="size-3.5" />
				Qo'shish
			</Button>
		</div>
	);
}

// ─── Tab config ────────────────────────────────────────────────────────────────
const TABS = [
	{
		value: "researches",
		label: "Tadqiqotlar",
		icon: <FlaskConical className="size-3.5" />,
		empty: {
			icon: <FlaskConical className="size-7" />,
			title: "Tadqiqotlar mavjud emas",
			description: "O'qituvchining ilmiy tadqiqotlari bu yerda ko'rsatiladi",
		},
	},
	{
		value: "publications",
		label: "Nazoratlar",
		icon: <BookText className="size-3.5" />,
		empty: {
			icon: <BookText className="size-7" />,
			title: "Nazoratlar mavjud emas",
			description: "Maqolalar, kitoblar va boshqa nashrlar bu yerda ko'rsatiladi",
		},
	},
	{
		value: "supervision",
		label: "Nashrlar",
		icon: <Users className="size-3.5" />,
		empty: {
			icon: <Users className="size-7" />,
			title: "Nashrlar mavjud emas",
			description: "Maqolalar, kitoblar va boshqa nashrlar bu yerda ko'rsatiladi",
		},
	},
	{
		value: "activities",
		label: "Maslahat",
		icon: <TrendingUp className="size-3.5" />,
		empty: {
			icon: <TrendingUp className="size-7" />,
			title: "Maslahatlar mavjud emas",
			description: "Maslahat va konsultatsiyalar bu yerda ko'rsatiladi",
		},
	},
	{
		value: "awards",
		label: "Mukofotlar",
		icon: <Star className="size-3.5" />,
		empty: {
			icon: <Award className="size-7" />,
			title: "Mukofotlar mavjud emas",
			description: "Respublika va xalqaro mukofotlar bu yerda ko'rsatiladi",
		},
	},
];

// ─── ActivityTabs ──────────────────────────────────────────────────────────────
type ActivityTabsProps = {
	activeTab: string;
	onTabChange: (tab: string) => void;
};

export function ActivityTabs({ activeTab, onTabChange }: ActivityTabsProps) {
	return (
		<Tabs
			value={activeTab}
			onValueChange={onTabChange}
			className="gap-0 w-full rounded-xl border bg-card overflow-hidden"
		>
			{/* Scrollable tabs on mobile */}
			<div className="border-b overflow-x-auto">
				<TabsList className="bg-transparent h-auto p-0 rounded-none gap-0 w-max sm:w-full justify-start">
					{TABS.map((tab) => (
						<TabsTrigger
							key={tab.value}
							value={tab.value}
							className={cn(
								"rounded-none border-0 border-b-2 border-transparent px-3 sm:px-4 py-2.5 text-[12px] sm:text-[13px] gap-1.5 h-auto whitespace-nowrap",
								"data-[state=active]:border-primary data-[state=active]:bg-transparent dark:data-[state=active]:bg-transparent",
								"data-[state=active]:text-primary data-[state=active]:shadow-none",
							)}
						>
							{tab.icon}
							{tab.label}
						</TabsTrigger>
					))}
				</TabsList>
			</div>

			<div className="px-3 sm:px-5">
				<TabsContent value="researches">
					<div className="py-4 overflow-x-auto">
						<ResearchesTab />
					</div>
				</TabsContent>
				<TabsContent value="publications">
					<div className="py-4 overflow-x-auto">
						<PublicationsTab />
					</div>
				</TabsContent>
				<TabsContent value="supervision">
					<div className="py-4 overflow-x-auto">
						<NashrlarTab />
					</div>
				</TabsContent>
				<TabsContent value="activities">
					<div className="py-4 overflow-x-auto">
						<MaslahatTab />
					</div>
				</TabsContent>

				{TABS.filter(
					(t) =>
						t.value !== "researches" &&
						t.value !== "publications" &&
						t.value !== "supervision" &&
						t.value !== "activities",
				).map((tab) => (
					<TabsContent key={tab.value} value={tab.value}>
						<EmptyState icon={tab.empty.icon} title={tab.empty.title} description={tab.empty.description} />
					</TabsContent>
				))}
			</div>
		</Tabs>
	);
}
