import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";
import { Task } from "./types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  ArrowDownAz,
  ArrowDownUp,
  ArrowDownZA,
  CalendarArrowDown,
  CalendarArrowUp,
  ClockArrowDown,
  ClockArrowUp,
  RotateCcw,
} from "lucide-react";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useEffect, useState } from "react";

export const QueryReset = () => {
  const [, setSearchParams] = useSearchParams();

  const onClick = () => {
    setSearchParams({});
    window.location.reload();
  };

  return (
    <Button onClick={onClick} variant={"outline"}>
      <RotateCcw className="mr-2 h-4 w-4" />
      Reset All
    </Button>
  );
};

export const QuerySearch = ({ className }: { className?: string }) => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const onChange = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      params.set("q", e);
    } else {
      params.delete("q");
    }
    navigate(`?${params.toString()}`);
  }, 300);
  return (
    <Input
      className={`${className}`}
      placeholder="Search Task.."
      defaultValue={searchParams.get("q")?.toString()}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export const QueryFilterStatus = ({ className }: { className?: string }) => {
  const status: Task["status"][] = ["pending", "in-progress", "completed"];

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const onChange = (e: string) => {
    const params = new URLSearchParams(searchParams);
    if (e) {
      if (e === "none") {
        params.delete("status");
      } else params.set("status", e);
    } else params.delete("status");

    navigate(`?${params.toString()}`);
  };

  return (
    <Select value={searchParams.get("status")?.toString()} onValueChange={onChange}>
      <SelectTrigger className={`${className} w-48`}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value={"none"}>All Status</SelectItem>
        {status?.map((item) => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export function QuerySort() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [sort, setSort] = useState("-createdAt");

  const onClick = (e: string) => {
    const params = new URLSearchParams(searchParams);
    setSort(e);
    if (e) {
      params.set("sort", e);
    } else params.delete("sort");

    navigate(`?${params.toString()}`);
  };

  useEffect(() => {
    const sortParam = searchParams.get("sort")?.toString();
    if (sortParam) {
      setSort(sortParam);
    }
  }, [searchParams]);

  return (
    <div className="flex gap-2 flex-wrap justify-center">
      <Button onClick={() => onClick("-dueDate")} variant={sort === "-dueDate" ? "default" : "outline"}>
        <CalendarArrowDown className="size-4 mr-2" />
        Logest Due Date
      </Button>
      <Button onClick={() => onClick("dueDate")} variant={sort === "dueDate" ? "default" : "outline"}>
        <CalendarArrowUp className="size-4 mr-2" />
        Sortest Due Date
      </Button>
      <Button onClick={() => onClick("-createdAt")} variant={sort === "-createdAt" ? "default" : "outline"}>
        <ClockArrowDown className="size-4 mr-2" />
        Latest
      </Button>
      <Button onClick={() => onClick("createdAt")} variant={sort === "createdAt" ? "default" : "outline"}>
        <ClockArrowUp className="size-4 mr-2" />
        Oldest
      </Button>
      <Button onClick={() => onClick("title")} variant={sort === "title" ? "default" : "outline"}>
        <ArrowDownAz className="size-4 mr-2" />
        A-Z
      </Button>
      <Button onClick={() => onClick("-title")} variant={sort === "-title" ? "default" : "outline"}>
        <ArrowDownZA className="size-4 mr-2" />
        Z-A
      </Button>
    </div>
  );
}

export const QuerySortBtn = () => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"}>
          <ArrowDownUp className="size-4 mr-2" /> Sorts
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom">
        <SheetHeader>
          <SheetTitle className="text-center">Sorting Tasks</SheetTitle>
          <SheetDescription className="text-center">Select to change sorting!</SheetDescription>
          <div className="flex justify-center pt-4">
            <QuerySort />
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
};
