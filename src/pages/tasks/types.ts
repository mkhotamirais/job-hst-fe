import { z } from "zod";

export type Task = {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "in-progress" | "completed";
  dueDate: Date;
  createdAt: Date;
  updatedAt: Date;
};

export const CreateTaskSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  status: z.enum(["pending", "in-progress", "completed", "expired"]).optional(),
  dueDate: z.date().optional(),
});

export type CreateTaskType = z.infer<typeof CreateTaskSchema>;
