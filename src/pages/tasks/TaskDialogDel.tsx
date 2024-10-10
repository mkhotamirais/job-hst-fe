import ModalDialog from "@/components/ModalDialog";
import { Button } from "@/components/ui/button";
import { DialogDescription } from "@/components/ui/dialog";
import { useTask } from "@/hooks/useTask";
import { baseUrl } from "@/lib/constants";
import { Task } from "@/pages/tasks/types";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface TaskDialogDelProps {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  item: Task;
}

export default function TaskDialogDel({ open, onOpenChange, title, item }: TaskDialogDelProps) {
  const [pending, setPending] = useState(false);
  const { delTaskById } = useTask();

  const onDel = async () => {
    setPending(true);
    await axios
      .delete(`${baseUrl}/api/tasks/${item._id}`)
      .then((res) => {
        toast.success(res?.data?.message);
        delTaskById(item._id);
        onOpenChange();
      })
      .catch((err) => {
        toast.error(err?.response?.data?.error);
      })
      .finally(() => setPending(false));
  };
  return (
    <ModalDialog open={open} onOpenChange={onOpenChange} title={title}>
      <div>
        <h2 className="">
          Are you sure you want to delete <i className="text-primary">{item.title}</i>?
        </h2>
        <DialogDescription>This action cannot be undone</DialogDescription>
      </div>
      <div className="flex gap-2">
        <Button disabled={pending} variant="destructive" onClick={onDel}>
          {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Delete
        </Button>
        <Button disabled={pending} variant="outline" onClick={onOpenChange}>
          Cancel
        </Button>
      </div>
    </ModalDialog>
  );
}
