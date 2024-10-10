import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import LoadPage from "@/components/LoadPage";
import TaskOptionBtn from "./TaskOptionBtn";
import { useTask } from "@/hooks/useTask";

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

  useEffect(() => {
    setPending(true);
    axios
      .get(`${baseUrl}/api/tasks`)
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setPending(false));
  }, [setTasks]);

  return (
    <section className="bg-secondary flex-1 py-4">
      <div className="container">
        <div className="flex mb-4 items-center justify-between">
          <h1 className="text-primary font-bold text-xl">Tasks List</h1>
          <Button asChild>
            <Link to="/tasks/create">Add Task</Link>
          </Button>
        </div>

        {pending && <LoadPage />}
        {!pending && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {tasks?.map((item) => (
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
        )}
      </div>
    </section>
  );
}
