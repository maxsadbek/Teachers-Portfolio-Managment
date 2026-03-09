import { Button } from "@/ui/button";
import { useNavigate, useParams } from "react-router";
import { TEACHERS } from "../data";
import { ChevronRight, GraduationCap } from "lucide-react";
import { StatsGrid } from "./stats-grid";
import { DEFAULT_DETAIL, TEACHER_DETAILS } from "./type";
import { ProfileSidebar } from "./detail-profile/profile-sidebar";
import { ProfileFormData } from "./detail-profile/profile-edit";
import { ProfileForm } from "./detail-profile/profile-form";
import { useState } from "react";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { ActivityTabs } from "./activity-tabs";
import { MOCK_RESEARCHES } from "./detail-tabs/researches-tab";
import { MOCK_PUBLICATIONS } from "./detail-tabs/publications-tab";
import { MOCK_NASHRLAR } from "./detail-tabs/nashrlar-tab";
import { MOCK_MASLAHATLAR } from "./detail-tabs/maslahat-tab";
import { ResearchModal } from "./detail-modals/research-modal";
import { useModalActions } from "@/store/modalStore";
import { PublicationModal } from "./detail-modals/publication-modal";
import { NashrModal } from "./detail-modals/nashr-modal";
import { MaslahatModal } from "./detail-modals/maslahat-modal";

export default function TeacherDetail() {
	const { id } = useParams();
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = useState("researches");
	const { open } = useModalActions();

	const teacher = TEACHERS.find((t) => t.id === Number(id));
	const detail = TEACHER_DETAILS[Number(id)] ?? DEFAULT_DETAIL;

	if (!teacher) {
		return (
			<div className="flex flex-col items-center justify-center h-64 gap-3">
				<GraduationCap className="size-10 text-muted-foreground" />
				<p className="text-muted-foreground text-sm">O'qituvchi topilmadi.</p>
				<Button variant="outline" size="sm" onClick={() => navigate("/teachers")}>
					Ro'yxatga qaytish
				</Button>
			</div>
		);
	}
	const profile: ProfileFormData = {
		fullName: teacher.name,
		email: teacher.email,
		age: "",
		phone: teacher.phone,
		department: teacher.department,
		position: teacher.position,
		bio: "",
		additionalInfo: "",
		specialty: "",
		orcId: "",
		scopusId: "",
		scienceId: "",
		researcherId: "",
		image: null,
		resume: null,
	};

	const COUNT_LABELS: Record<string, string> = {
		researches: "Tadqiqotlar",
		publications: "Nazoratlar",
		supervision: "Nashrlar",
		activities: "Maslahatlar",
		awards: "Mukofotlar",
	};
	const ADD_LABELS: Record<string, string> = {
		researches: "Tadqiqot qo'shish",
		publications: "Nazorat qo'shish",
		supervision: "Nashr qo'shish",
		activities: "Maslahat qo'shish",
		awards: "Mukofot qo'shish",
	};
	const TAB_COUNTS: Record<string, number> = {
		researches: MOCK_RESEARCHES.length,
		publications: MOCK_PUBLICATIONS.length,
		supervision: MOCK_NASHRLAR.length,
		activities: MOCK_MASLAHATLAR.length,
		awards: 0,
	};
	const MODAL_TYPES: Record<string, string> = {
		researches: "research",
		publications: "nazorat",
		supervision: "nashr",
		activities: "maslahat",
	};

	return (
		<div className="flex flex-col gap-4 sm:gap-5">
			{/* Breadcrumb */}
			<div className="flex items-center gap-2 text-[13px] text-muted-foreground">
				<button
					type="button"
					onClick={() => navigate("/teachers")}
					className="hover:text-foreground transition-colors cursor-pointer"
				>
					O'qituvchilar
				</button>
				<ChevronRight className="size-3.5" />
				<span className="text-foreground font-medium truncate max-w-[160px] sm:max-w-[300px]">{teacher.name}</span>
			</div>

			{/* Top: Sidebar + ProfileForm — mobile: column, desktop: row */}
			<div className="flex flex-col lg:flex-row gap-4 sm:gap-5 items-start">
				<ProfileSidebar profile={profile} />
				<div className="w-full lg:flex-1 min-w-0">
					<ProfileForm defaultValues={profile} />
				</div>
			</div>

			<TableToolbar
				countLabel={COUNT_LABELS[activeTab]}
				count={TAB_COUNTS[activeTab]}
				searchValue=""
				onSearchChange={() => {}}
				showSearch={false}
				addLabel={ADD_LABELS[activeTab]}
				onAdd={MODAL_TYPES[activeTab] ? () => open({ _type: MODAL_TYPES[activeTab] }) : undefined}
			/>
			<ActivityTabs activeTab={activeTab} onTabChange={setActiveTab} />

			<StatsGrid stats={detail.stats} subStats={detail.subStats} />

			<ResearchModal />
			<PublicationModal />
			<NashrModal />
			<MaslahatModal />
		</div>
	);
}
