import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { CreateTaskSchema, CreateTaskType } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "@/lib/constants";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import LoadPage from "@/components/LoadPage";

export default function TaskUpdate() {
  const [pending, setPending] = useState(false);
  const [pendingData, setPendingData] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  const form = useForm<CreateTaskType>({
    resolver: zodResolver(CreateTaskSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  useEffect(() => {
    setPendingData(true);
    if (id) {
      axios
        .get(`${baseUrl}/api/tasks/${id}`)
        .then((res) => {
          form.reset({
            title: res.data.title,
            description: res.data.description,
            status: res.data.status,
            dueDate: new Date(res.data.dueDate),
          });
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setPendingData(false));
    }
  }, [id, form]);

  const onSubmit = async (values: CreateTaskType) => {
    console.log(values);
    setPending(true);
    await axios
      .patch(`${baseUrl}/api/tasks/${id}`, values)
      .then((res) => {
        toast.success(res?.data?.message);
        navigate("/tasks");
      })
      .catch((err) => {
        console.log(err);
        toast.error("gagal");
      })
      .finally(() => setPending(false));
  };

  if (pendingData) {
    return <LoadPage />;
  }

  return (
    <div className="flex-1 py-4 flex items-center justify-center bg-secondary">
      <div className="container">
        <div className="max-w-lg mx-auto p-6 shadow-lg rounded-lg bg-background">
          <h1 className="text-primary font-bold text-xl mb-4 text-center">Update Task</h1>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input disabled={pending} placeholder="Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea disabled={pending} placeholder="Description" className="resize-none" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel>Status</FormLabel>
                    <Select
                      disabled={pending}
                      onValueChange={(value) => field.onChange(value)}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="">
                    <FormLabel className="">Due Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild className="min-w-full">
                        <FormControl>
                          <Button
                            disabled={pending}
                            variant={"outline"}
                            className={cn(
                              "w-[240px] pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          // disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormDescription>
                      If no due date is set, the status will be <span className="font-bold">pending</span>, otherwise
                      the status will be <span className="font-bold">in-progress</span>.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="pt-4">
                <Button disabled={pending} type="submit" className="w-full">
                  {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}
