import { DataTable } from "@/components/data-table/data-table";
import type { ColumnDef } from "@/components/data-table/data-table";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { FileInput } from "@/components/file-input/file-input";
import { Modal } from "@/components/modal/modal";
import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { useModalActions, useModalEditData, useModalIsOpen } from "@/store/modalStore";
import { useCreateCollage } from "@/hooks/collage/useCreateCollage";
import { useCollage } from "@/hooks/collage/useCollage";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Pencil, Trash2, Plus, GraduationCap } from "lucide-react";
import { useEffect, useMemo } from "react";
import { useSearchParams } from "react-router";
import { Controller, useForm } from "react-hook-form";
import type { Collage } from "@/features/collage/collage.type";
import { collageService } from "@/features/collage/collage.service";
import { toast } from "sonner";

type FacultyFormValues = {
  name: string;
  image: File | null;
};

function createColumns(
  onEdit: (row: Collage) => void,
  onDelete: (id: number) => void,
  pageIndex: number,
  pageSize: number,
): ColumnDef<Collage>[] {
  return [
    {
      accessorKey: "id",
      header: "#",
      cell: ({ row }: any) => (
        <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">
          {pageIndex * pageSize + row.index + 1}
        </span>
      ),
    },
    {
      accessorKey: "imgUrl",
      header: "Rasm",
      cell: ({ row }) => {
        const imgUrl = row.original.imgUrl;
        return (
          <div className="w-10 h-10 rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-100/50 dark:bg-slate-800/50">
            {imgUrl ? (
              <img src={imgUrl} className="w-full h-full object-cover" alt="" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <GraduationCap size={18} />
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Fakultet nomi",
      cell: ({ row }) => (
        <span className="font-semibold text-slate-700 dark:text-slate-200">
          {row.original.name}
        </span>
      ),
    },
    {
      id: "actions",
      header: () => <div className="text-right">Amallar</div>,
      cell: ({ row }) => (
        <div className="flex justify-end items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(row.original)}
            className="h-8 w-8 text-blue-600 dark:text-blue-400 hover:bg-blue-50/50 dark:hover:bg-blue-900/20"
          >
            <Pencil className="size-4" />
          </Button>
          <ConfirmPopover onConfirm={() => onDelete(row.original.id)}>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-red-500 dark:text-red-400 hover:bg-red-50/50 dark:hover:bg-red-900/20"
            >
              <Trash2 className="size-4" />
            </Button>
          </ConfirmPopover>
        </div>
      ),
    },
  ];
}

export default function Faculties() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page") ?? "0");
  const size = 10;
  const search = searchParams.get("name") ?? "";

  const isOpen = useModalIsOpen();
  const editData = useModalEditData() as Collage | null;
  const { open, close } = useModalActions();
  const isEdit = !!editData;

  const { mutate: createCollage, isPending: isCreating } = useCreateCollage();
  const { data: response, isLoading, refetch } = useCollage();

  const faculties = response?.data ?? [];
  const totalElements = response?.data?.length || 0;

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<FacultyFormValues>({
    defaultValues: { name: "", image: null },
  });

  useEffect(() => {
    if (editData) reset({ name: editData.name, image: null });
    else reset({ name: "", image: null });
  }, [editData, reset]);

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = async (values: FacultyFormValues) => {
    try {
      if (isEdit && editData) {
        await collageService.edit(editData.id, { name: values.name, image: values.image } as any);
        toast.success("O'zgarishlar saqlandi");
      } else {
        if (!values.image) return toast.error("Rasm tanlang");
        createCollage({ name: values.name, image: values.image });
      }
      handleClose();
      refetch();
    } catch (error) {
      toast.error("Xatolik yuz berdi");
    }
  };

  const columns = useMemo(() => createColumns(
    (row) => open(row),
    (id) => collageService.remove(id).then(() => { toast.success("O'chirildi"); refetch(); }),
    page,
    size,
  ), [open, page, size, refetch]);

  return (
    <div className="space-y-4 p-4 min-h-screen bg-slate-50 dark:bg-transparent transition-colors duration-300">

      {/* Header - Transparent & Blur */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white/60 dark:bg-slate-900/60 backdrop-blur-md p-5 rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-slate-800 dark:text-white">Fakultetlar</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Jami: {totalElements} ta</p>
        </div>
        <Button
          onClick={() => open()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 rounded-lg gap-2 h-10 shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
        >
          <Plus size={18} />
          <span className="font-medium">Fakultet qo'shish</span>
        </Button>
      </div>

      <div className="bg-white/40 dark:bg-slate-900/40 backdrop-blur-sm p-2 rounded-xl border border-slate-200/40 dark:border-slate-800/40 shadow-sm">
        <TableToolbar
          searchValue={search}
          onSearchChange={(val) => setSearchParams({ name: val, page: "0" })}
          hideAddButton
        />
      </div>

      {/* Table Section - Transparent Body */}
      <div className="bg-white/60 dark:bg-slate-900/60 backdrop-blur-md rounded-xl border border-slate-200/50 dark:border-slate-800/50 shadow-sm overflow-hidden">
        <DataTable columns={columns} data={faculties} isLoading={isLoading} />
      </div>

      {/* Modal - Dark mode with transparency */}
      <Modal open={isOpen} onClose={handleClose} title={isEdit ? "Tahrirlash" : "Yangi qo'shish"}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">Fakultet logotipi</Label>
            <div className="rounded-lg border border-slate-200 dark:border-slate-800 overflow-hidden bg-slate-50/50 dark:bg-slate-950/50">
              <Controller
                name="image"
                control={control}
                render={({ field }) => (
                  <FileInput type="image" value={field.value} onChange={field.onChange} />
                )}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-slate-700 dark:text-slate-300 font-medium">Fakultet nomi</Label>
            <Input
              className="h-10 rounded-lg border-slate-200/60 dark:border-slate-800/60 bg-white/50 dark:bg-slate-950/50 dark:text-white focus:border-blue-500 focus:ring-blue-50"
              placeholder="Nomini kiriting"
              {...register("name", { required: "Nomi majburiy" })}
            />
            {errors.name && <p className="text-xs text-red-500 font-medium">{errors.name.message}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              className="rounded-lg px-6 h-10 border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              disabled={isCreating}
              className="bg-blue-600 hover:bg-blue-700 rounded-lg px-8 h-10 text-white font-medium"
            >
              {isEdit ? "Saqlash" : "Qo'shish"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
