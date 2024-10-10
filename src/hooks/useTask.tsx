import { Task } from "@/pages/tasks/types";
import { create } from "zustand";

interface TaskState {
  tasks: Task[];
  setTasks: (tasks: Task[]) => void;
  delTaskById: (id: string) => void;
}

export const useTask = create<TaskState>((set) => ({
  tasks: [],
  setTasks: (tasks) => set({ tasks }),
  delTaskById: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task._id !== id) })),
}));
