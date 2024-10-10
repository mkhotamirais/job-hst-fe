import { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import LoadPage from "@/components/LoadPage";
import TaskOptionBtn from "./TaskOptionBtn";
import { useTask } from "@/hooks/useTask";

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

  const badgeVarian = (deadline: Date) => {
    if (!deadline) {
      return "secondary";
    }
    const timeDeadline = new Date(deadline).getTime();
    const timeNow = new Date().getTime();

    if (deadline) {
      if (timeDeadline < timeNow) {
        return "warning";
      }
      return "default";
    }
  };

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
                <TaskOptionBtn className="absolute right-2 top-2" item={item} />
                <h3 className="text-primary font-medium capitalize text-lg mb-2 text-center">{item?.title}</h3>
                <Badge className="capitalize mb-4" variant={badgeVarian(item?.dueDate)}>
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
