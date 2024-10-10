import ModalDialog from "@/components/ModalDialog";
import { Task } from "@/pages/tasks/types";
import { formatDistanceToNow } from "date-fns";

interface TaskDialogDetailProps {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  item: Task;
}

export default function TaskDialogDetail({ open, onOpenChange, title, item }: TaskDialogDetailProps) {
  const isDueDate = item.dueDate ? new Date(item?.dueDate) : new Date();
  const distanceDueDate = formatDistanceToNow(isDueDate, { addSuffix: true });
  const distanceCreatedAt = formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true });
  return (
    <ModalDialog open={open} onOpenChange={onOpenChange} title={title}>
      <div className="grid grid-cols-3 leading-loose">
        <div className="col-span-1 text-muted-foreground">
          <div>Title</div>
          <div>Description</div>
          <div>Due Date</div>
          <div>Created Date</div>
        </div>
        <div className="col-span-2">
          <div className="capitalize text-primary">{item.title}</div>
          <div className="first-letter:uppercase">{item.description}</div>
          <div>{distanceDueDate}</div>
          <div>{distanceCreatedAt}</div>
        </div>
      </div>
    </ModalDialog>
  );
}
