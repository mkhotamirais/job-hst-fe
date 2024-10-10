import ModalDialog from "@/components/ModalDialog";
import { Badge } from "@/components/ui/badge";
import { Task } from "@/pages/tasks/types";
import { format, formatDistanceToNow } from "date-fns";
import { badgeVarian } from "./Tasks";

interface TaskDialogDetailProps {
  open: boolean;
  onOpenChange: () => void;
  title: string;
  item: Task;
}

export default function TaskDialogDetail({ open, onOpenChange, title, item }: TaskDialogDetailProps) {
  const isDueDate = item.dueDate ? new Date(item?.dueDate) : new Date();
  const dateDueDate = format(isDueDate, "yyyy-MM-dd");
  const distanceDueDate = formatDistanceToNow(isDueDate, { addSuffix: true });
  const dateCreatedAt = format(new Date(item?.createdAt), "yyyy-MM-dd");
  const distanceCreatedAt = formatDistanceToNow(new Date(item?.createdAt), { addSuffix: true });

  return (
    <ModalDialog open={open} onOpenChange={onOpenChange} title={title}>
      <div className="grid grid-cols-3 leading-loose">
        <div className="col-span-1 text-muted-foreground">
          <div>Title</div>
          <div>Status</div>
          <div>Description</div>
          <div>Due Date</div>
          <div>Created Date</div>
        </div>
        <div className="col-span-2">
          <div className="capitalize text-primary">{item.title}</div>
          <div>
            <Badge className="capitalize" variant={badgeVarian(item?.status)}>
              {item?.status}
            </Badge>
          </div>
          <div className="first-letter:uppercase">{item.description}</div>
          <div>
            {dateDueDate} ({distanceDueDate})
          </div>
          <div>
            {dateCreatedAt} ({distanceCreatedAt})
          </div>
        </div>
      </div>
    </ModalDialog>
  );
}
