import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link, useSearchParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import LoadPage from "@/components/LoadPage";
import TaskOptionBtn from "./TaskOptionBtn";
import { useTask } from "@/hooks/useTask";
import { QueryFilterStatus, QueryReset, QuerySearch, QuerySortBtn } from "./TaskQuery";
import { Plus } from "lucide-react";

export const badgeVarian = (status: string) => {
  if (status === "pending") {
    return "secondary";
  } else if (status === "in-progress") {
    return "warning";
  } else {
    return "default";
  }
};

export default function Tasks() {
  const { tasks, setTasks } = useTask();
  const [pending, setPending] = useState(false);
  const [err, setErr] = useState("");
  const [searchParams] = useSearchParams();

  useEffect(() => {
    axios.get(`${baseUrl}/api/tasks-complete`);
  }, []);

  useEffect(() => {
    setPending(true);
    axios
      .get(`${baseUrl}/api/tasks?${searchParams.toString()}`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
        setErr("Network error");
      })
      .finally(() => setPending(false));
  }, [setTasks, searchParams]);

  return (
    <section className="bg-secondary flex-1 py-4">
      {err ? (
        <div className="container text-center italic text-red-500 mt-4 text-xl">{err}</div>
      ) : (
        <div className="container">
          <div className="flex flex-col sm:flex-row mb-4 items-center justify-between">
            <h1 className="text-primary font-bold text-xl mb-4 sm:mb-0">Tasks List</h1>

            <div className="flex gap-2">
              {tasks.length > 0 && (
                <div className="flex gap-2">
                  {searchParams?.size > 0 && <QueryReset />}
                  <QuerySortBtn />
                </div>
              )}

              <Button asChild>
                <Link to="/tasks/create">
                  <Plus className="size-4 mr-2" />
                  Add Task
                </Link>
              </Button>
            </div>
          </div>

          <div className="bg-background p-3 rounded-lg mb-2">
            <div className="flex gap-2">
              <QuerySearch className="w-full" />
              <QueryFilterStatus className="w-32" />
            </div>
          </div>

          {pending && <LoadPage />}
          {!pending && (
            <>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                {tasks.length > 0 &&
                  tasks?.map((item) => (
                    <div
                      key={item?._id}
                      className="relative bg-background shadow-lg rounded-lg p-6 flex flex-col justify-center items-center"
                    >
                      <TaskOptionBtn className="absolute right-4 top-2" item={item} />
                      <h3 className="text-primary font-medium capitalize text-lg mb-2 text-center">{item?.title}</h3>
                      <Badge className="capitalize mb-4" variant={badgeVarian(item?.status)}>
                        {item?.status}
                      </Badge>
                    </div>
                  ))}
              </div>
              {tasks.length === 0 && (
                <div className="text-primary text-center py-4">
                  <p className="italic mb-4">No dafa found</p>
                  <QueryReset />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </section>
  );
}
