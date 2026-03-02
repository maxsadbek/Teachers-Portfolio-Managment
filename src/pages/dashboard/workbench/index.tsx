import { DataTable, DataTableColumn } from "@/components/data-table/data-table";
import { Icon } from "@/components/icon";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/ui/card";

const stats = [
	{
		label: "Jami O'qituvchilar",
		value: 507,
		icon: "mdi:account-group",
		color: "bg-blue-100",
		iconColor: "#1d4ed9",
	},
	{
		label: "Erkak O'qituvchilar",
		value: 214,
		icon: "mdi:account-tie",
		color: "bg-cyan-100",
		iconColor: "#0e7495",
	},
	{
		label: "Ayol O'qituvchilar",
		value: 293,
		icon: "mdi:account-heart",
		color: "bg-pink-100",
		iconColor: "#be185d",
	},
	{
		label: "Ilmiy Darajalar Bilan",
		value: 247,
		icon: "mdi:school",
		color: "bg-violet-100",
		iconColor: "#7e22ce",
	},
];

const positionStats = [
	{ label: "Professorlar", value: 20, icon: "mdi:account-star", border: "border-l-amber-500" },
	{ label: "Dotsent", value: 45, icon: "mdi:account-badge", border: "border-l-blue-500" },
	{ label: "Katta o'qituvchilar", value: 97, icon: "mdi:account-school", border: "border-l-green-500" },
	{ label: "Assistentlar", value: 80, icon: "mdi:account-supervisor", border: "border-l-rose-500" },
];

const knowledgeStats = [
	{ label: "Nashr etilgan maqolalar", value: 312, icon: "mdi:newspaper-variant", iconColor: "#0369a1" },
	{ label: "Patentlar va ixtirolar", value: 24, icon: "mdi:certificate", iconColor: "#b45309" },
	{ label: "Xalqaro konferensiyalar", value: 56, icon: "mdi:earth", iconColor: "#047857" },
	{ label: "Loyihalar soni", value: 19, icon: "mdi:briefcase", iconColor: "#7c3aed" },
];

const educationStats = [
	{ label: "Fan doktorlari (DSc)", value: 23, icon: "mdi:medal", color: "text-amber-500", bg: "bg-amber-50" },
	{
		label: "Falsafa doktorlari (PhD)",
		value: 64,
		icon: "mdi:school-outline",
		color: "text-blue-600",
		bg: "bg-blue-50",
	},
	{ label: "Magistrlar", value: 161, icon: "mdi:book-education", color: "text-emerald-600", bg: "bg-emerald-50" },
];

const kafedraStats = [
	{ label: "Jami bo'limlar", value: 12, icon: "mdi:office-building", bg: "bg-orange-500" },
	{ label: "Jami tadqiqotlar", value: 34, icon: "mdi:flask", bg: "bg-green-500" },
	{ label: "Fakultetda faol xodimlar", value: 198, icon: "mdi:account-check", bg: "bg-blue-500" },
	{ label: "Bu oy taqdimnoma", value: 7, icon: "mdi:presentation", bg: "bg-violet-500" },
];
type KafedraRow = {
	nomi: string;
	fakultet: string;
	taqdimotlar: number;
	xodimlar: number;
	oxirgiKim: string;
	oxirgiVaqt: string;
	oxirgiSana: string;
};

const kafedraColumns: DataTableColumn<KafedraRow>[] = [
	{
		key: "nomi",
		label: "Kafedra Nomi",
		render: (row) => <span className="font-medium">{row.nomi}</span>,
	},
	{
		key: "fakultet",
		label: "Fakultet",
		render: (row) => <span className="text-muted-foreground">{row.fakultet}</span>,
	},
	{
		key: "taqdimotlar",
		label: "Jami Taqdimotlar",
		align: "right",
		render: (row) => <span className="font-bold">{row.taqdimotlar.toLocaleString()}</span>,
	},
	{
		key: "xodimlar",
		label: "Kafedra Xodimlari",
		align: "right",
		render: (row) => (
			<span className="bg-blue-100 text-blue-700 text-[12px] font-semibold px-2 py-0.5 rounded-full">
				{row.xodimlar}
			</span>
		),
	},
	{
		key: "oxirgiKim",
		label: "Oxirgi Yuborish",
		render: (row) => (
			<div className="flex flex-col gap-0.5">
				<span className="font-medium">{row.oxirgiKim}</span>
				<span className="text-[11px] text-muted-foreground">
					{row.oxirgiVaqt} · {row.oxirgiSana}
				</span>
			</div>
		),
	},
];

const kafedraTable = [
	{
		nomi: "Farmatsiya va kimyo kafedrasi",
		fakultet: "Stomatologiya va Farmatsiya fakulteti",
		taqdimotlar: 3024,
		xodimlar: 39,
		oxirgiKim: "TURSUNQULOV J. B.",
		oxirgiVaqt: "1 kun oldin",
		oxirgiSana: "Fevral 26, 2026 04:43",
	},
	{
		nomi: "Ichki kasalliklar kafedrasi",
		fakultet: "Davolash fakulteti",
		taqdimotlar: 2781,
		xodimlar: 45,
		oxirgiKim: "YUSUPOVA M. A.",
		oxirgiVaqt: "2 kun oldin",
		oxirgiSana: "Fevral 25, 2026 11:20",
	},
	{
		nomi: "Jarrohlik kafedrasi",
		fakultet: "Davolash fakulteti",
		taqdimotlar: 2390,
		xodimlar: 38,
		oxirgiKim: "RAHIMOV B. T.",
		oxirgiVaqt: "3 kun oldin",
		oxirgiSana: "Fevral 24, 2026 09:15",
	},
	{
		nomi: "Bolalar kasalliklari kafedrasi",
		fakultet: "Pediatriya fakulteti",
		taqdimotlar: 1856,
		xodimlar: 32,
		oxirgiKim: "QODIROV S. N.",
		oxirgiVaqt: "4 kun oldin",
		oxirgiSana: "Fevral 23, 2026 14:30",
	},
	{
		nomi: "Stomatologiya kafedrasi",
		fakultet: "Stomatologiya va Farmatsiya fakulteti",
		taqdimotlar: 1624,
		xodimlar: 28,
		oxirgiKim: "MIRZAYEVA D. X.",
		oxirgiVaqt: "5 kun oldin",
		oxirgiSana: "Fevral 22, 2026 10:05",
	},
	{
		nomi: "Akusherlik va ginekologiya",
		fakultet: "Tibbiy profilaktika fakulteti",
		taqdimotlar: 1432,
		xodimlar: 25,
		oxirgiKim: "HASANOV A. R.",
		oxirgiVaqt: "1 hafta oldin",
		oxirgiSana: "Fevral 19, 2026 16:45",
	},
	{
		nomi: "Nevrologiya kafedrasi",
		fakultet: "Davolash fakulteti",
		taqdimotlar: 1287,
		xodimlar: 22,
		oxirgiKim: "ISLOMOV F. K.",
		oxirgiVaqt: "1 hafta oldin",
		oxirgiSana: "Fevral 18, 2026 08:50",
	},
	{
		nomi: "Biokimyo kafedrasi",
		fakultet: "Tibbiy biologiya fakulteti",
		taqdimotlar: 987,
		xodimlar: 19,
		oxirgiKim: "NAZAROVA G. I.",
		oxirgiVaqt: "2 hafta oldin",
		oxirgiSana: "Fevral 12, 2026 13:10",
	},
];

const engFaolBolim = {
	nomi: "Farmatsiya va kimyo kafedrasi",
	taqdimotlar: 3024,
};

const oxirgiFailiyat = {
	ism: "KUZIEV OTABEK JURAKULOVICH",
	vaqt: "21 soat oldin",
};
export default function Workbench() {
	return (
		<div className="flex flex-col gap-4 w-full">
			<span className="text-[18px] font-semibold capitalize">Umumiy statistika</span>
			{/* Umumiy statistika */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{stats.map((stat) => {
					const { color, icon, label, value, iconColor } = stat;
					return (
						<Card key={stat.label}>
							<CardHeader className="flex flex-row items-center justify-between pb-2">
								<CardTitle>
									<span className="text-[14px] font-medium text-muted-foreground">{label}</span>
								</CardTitle>
								<CardAction className={`rounded-full ${color} p-2 w-12 h-12 flex items-center justify-center`}>
									<Icon icon={icon} size={24} color={iconColor} />
								</CardAction>
							</CardHeader>
							<CardContent>
								<span className="text-[24px] font-bold">{value.toLocaleString()}</span>
							</CardContent>
						</Card>
					);
				})}
			</div>
			{/* Lavozim bo'yicha statistika */}
			<div className="flex flex-col gap-3">
				<span className="text-[18px] font-semibold capitalize">Lavozimlar bo'yicha</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
					{positionStats.map((stat) => {
						const { border, icon, label, value } = stat;
						return (
							<Card key={label} className={`border-l-4 ${border} py-0`}>
								<CardContent className="flex items-center justify-between px-4 py-3 ">
									<div className="flex flex-col gap-y-0.5">
										<span className="text-[12px] font-bold leading-tight">{label}</span>
										<span className="text-[20px] text-muted-foreground ">{value.toLocaleString()}</span>
									</div>
									<Icon icon={icon} size={28} className="text-muted-foreground opacity-40" />
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
			{/* Ilmiy faoliyat bo'yicha statistika */}
			<div className="flex flex-col gap-3">
				<span className="text-[18px] font-semibold capitalize">Ilmiy darajalari</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{knowledgeStats.map((stat) => {
						const { icon, iconColor, label, value } = stat;
						return (
							<Card key={label} className="py-0">
								<CardContent className="flex flex-col items-center justify-center gap-1 px-4 py-4 text-center">
									<Icon icon={icon} size={28} color={iconColor} />
									<span className="text-[22px] font-bold leading-tight">{value.toLocaleString()}</span>
									<span className="text-[11px] text-muted-foreground leading-tight">{label}</span>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Ta'lim darajasi bo'yicha statistika */}
			<div className="flex flex-col gap-3">
				<span className="text-[18px] font-semibold capitalize">Ta'lim Darajalari</span>
				<div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
					{educationStats.map((stat) => {
						const { bg, color, icon, label, value } = stat;
						return (
							<Card key={label} className={`${bg} dark:bg-[#141414] border-0 py-0`}>
								<CardContent className="flex items-center gap-4 px-5 py-4">
									<Icon icon={icon} size={32} className={color} />
									<div className="flex flex-col gap-0.5">
										<span className="text-[12px] text-muted-foreground leading-tight">{label}</span>
										<span className={`text-[22px] font-bold leading-tight ${color}`}>{value}</span>
									</div>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>

			{/* Kafedralar bo'yicha statistika */}
			<div className="flex flex-col gap-3">
				<span className="text-[18px] font-semibold capitalize">Kafedra Statistikasi</span>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
					{kafedraStats.map((stat) => {
						const { bg, icon, label, value } = stat;
						return (
							<Card key={label}>
								<CardHeader className="flex flex-row items-center justify-between pb-2">
									<CardTitle>
										<span className="text-[13px] font-medium text-muted-foreground">{label}</span>
									</CardTitle>
									<CardAction className={`${bg} rounded-full p-3 w-12 h-12 flex items-center justify-center`}>
										<Icon icon={icon} size={24} color="white" />
									</CardAction>
								</CardHeader>
								<CardContent>
									<span className="text-[28px] font-bold">{value.toLocaleString()}</span>
								</CardContent>
							</Card>
						);
					})}
				</div>
			</div>
			{/* Kafedra table statistika */}
			<div className="flex flex-col gap-3">
				<div className="flex flex-col gap-0.5">
					<span className="text-[18px] font-semibold capitalize">Kafedralar Haqida Umumiy Ma'lumot</span>
					<span className="text-[12px] text-muted-foreground">
						Har bir bo'lim uchun batafsil statistika, shu jumladan taqdimotlar va so'nggi faoliyat
					</span>
				</div>
				<DataTable data={kafedraTable} columns={kafedraColumns} />
			</div>

			{/* Oxirgi faoliyat */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
				{/* Eng faol bo'lim */}
				<Card className="border-0" style={{ backgroundColor: "#23B257" }}>
					<CardContent className="flex flex-col gap-2 px-6 py-5">
						<span className="text-[13px] font-medium text-white/70">Eng Faol Bo'lim</span>
						<span className="text-[18px] font-bold text-white">{engFaolBolim.nomi}</span>
						<span className="text-[13px] text-white/80">{engFaolBolim.taqdimotlar.toLocaleString()} taqdimnoma</span>
					</CardContent>
				</Card>

				{/* Oxirgi faoliyat */}
				<Card className="border-0" style={{ backgroundColor: "#3676F0" }}>
					<CardContent className="flex flex-col gap-2 px-6 py-5">
						<span className="text-[13px] font-medium text-white/70">Oxirgi Faoliyat</span>
						<span className="text-[18px] font-bold text-white">{oxirgiFailiyat.ism}</span>
						<span className="text-[13px] text-white/80">{oxirgiFailiyat.vaqt}</span>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
