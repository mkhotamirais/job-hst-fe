import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { PiDotsThreeOutlineLight } from "react-icons/pi";
import { Task } from "./types";
import TaskDialogDetail from "./TaskDialogDetail";
import { Edit, Eye, Trash } from "lucide-react";
import TaskDialogDel from "./TaskDialogDel";

export default function TaskOptionBtn({ className, item }: { className?: string; item: Task }) {
  const [openDetail, setOpenDetail] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  return (
    <>
      <TaskDialogDetail
        open={openDetail}
        onOpenChange={() => setOpenDetail(false)}
        title={`Detail ${item.title}`}
        item={item}
      />
      <TaskDialogDel open={openDel} onOpenChange={() => setOpenDel(false)} title={`Delete ${item.title}`} item={item} />

      <div className={`${className}`}>
        <DropdownMenu>
          <DropdownMenuTrigger>
            <PiDotsThreeOutlineLight />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="backdrop-blur">
            <DropdownMenuLabel>
              Options <i className="text-primary">{item.title}</i>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setOpenDetail(true)} className="cursor-pointer">
              <Eye className="mr-2 h-4 w-4" />
              Detail
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Edit className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpenDel(true)} className="cursor-pointer text-red-500 hover:text-black">
              <Trash className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </>
  );
}
