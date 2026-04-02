import { TableToolbar } from "@/components/table-toolbar/table-toolbar";
import { Card, CardContent } from "@/ui/card";
import { Pencil, Trash2, Briefcase, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { useModalActions, useModalIsOpen, useModalEditData } from "@/store/modalStore";
import { Modal } from "@/components/modal/modal";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { Input } from "@/ui/input";
import { ConfirmPopover } from "@/components/confirm-popover/confirm-popover";
import { usePositions } from "../../hooks/positions/usePositions";
import { usePositionForm } from "../../hooks/positions/usePositionForm";

type Position = {
  id: number;
  name: string;
  count: number;
};

export default function Positions() {
  const [search, setSearch] = useState("");
  const isOpen = useModalIsOpen();
  const { close, open } = useModalActions();
  const editData = useModalEditData() as Position | null;

  const { positions, loading, createPosition, updatePosition, removePosition } = usePositions();

  const { form, onSubmit, isEdit } = usePositionForm({
    onCreate: createPosition,
    onUpdate: updatePosition,
  });

  const {
    register,
    formState: { errors },
  } = form;

  const filtered = useMemo(
    () => (positions ?? []).filter((f) => f.name.toLowerCase().includes(search.toLowerCase())),
    [search, positions],
  );

  return (
    <div className="p-1 space-y-6">
      <TableToolbar
        countLabel="Lavozimlar"
        count={filtered.length}
        searchValue={search}
        onSearchChange={setSearch}
        onAdd={() => open()}
        addLabel="Lavozim qo'shish"
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-28 rounded-xl bg-slate-100 dark:bg-slate-800/50 animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
          {filtered.length ? (
            filtered.map((position) => (
              <Card
                key={position.id}
                className="group rounded-xl border border-slate-200 dark:border-slate-700/50 bg-white dark:bg-slate-900 hover:border-indigo-400/60 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 overflow-hidden"
              >
                <div className="h-1 bg-gradient-to-r from-indigo-500 via-indigo-400 to-violet-500 opacity-80" />
                <CardContent className="p-3 flex flex-col justify-between h-full min-h-[100px]">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="p-1.5 rounded-lg bg-gradient-to-br from-indigo-50 to-indigo-100 dark:from-indigo-500/10 dark:to-indigo-500/20 text-indigo-600 dark:text-indigo-400 shadow-sm">
                          <Briefcase size={14} />
                        </div>
                        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {position.name}
                        </h3>
                      </div>
                      <span className="px-2 py-0.5 text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-full">
                        #{position.id}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 ml-8">
                      <Users size={12} className="text-indigo-400" />
                      <span className="text-xs font-medium">{position.count} ta xodim</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 pt-2.5 mt-2 border-t border-slate-100 dark:border-slate-800">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => open(position)}
                      className="flex-1 h-7 rounded-lg text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 text-xs font-medium transition-colors"
                    >
                      <Pencil className="mr-1 size-3" />
                      Tahrirlash
                    </Button>
                    <ConfirmPopover onConfirm={() => removePosition(position.id)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="flex-1 h-7 rounded-lg text-rose-500 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 text-xs font-medium transition-colors"
                      >
                        <Trash2 className="mr-1 size-3" />
                        O'chirish
                      </Button>
                    </ConfirmPopover>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center py-12 bg-slate-50 dark:bg-slate-800/40 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
              <Briefcase className="size-7 text-slate-300 dark:text-slate-600 mb-2" />
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Ma'lumot topilmadi</p>
            </div>
          )}
        </div>
      )}

      <Modal open={isOpen} onClose={close} title={isEdit ? "Lavozimni tahrirlash" : "Yangi lavozim qo'shish"}>
        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <div className="space-y-1.5">
            <Label htmlFor="position-name" className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">
              Lavozim nomi
            </Label>
            <Input
              id="position-name"
              className="h-10 rounded-lg border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 placeholder:text-slate-400"
              placeholder="Masalan: Professor"
              {...register("name", { required: "Lavozim nomi kiritilishi shart" })}
            />
            {errors.name && <span className="text-[11px] text-rose-500 font-medium">{errors.name.message}</span>}
          </div>

          <div className="flex gap-2 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={close}
              className="flex-1 h-10 rounded-lg text-slate-500 font-medium hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Bekor qilish
            </Button>
            <Button
              type="submit"
              className="flex-1 h-10 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium active:scale-[0.98] transition-transform"
            >
              {isEdit ? "Saqlash" : "Qo'shish"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
