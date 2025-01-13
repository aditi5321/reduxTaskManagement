"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { PopoverClose } from "@radix-ui/react-popover";
import { editTask, Task } from "@/features/TaskSlice";
import { toast } from "sonner";

const formSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Task Name must be at least 3 characters." })
    .max(50, { message: "Task Name must be at less than 50 characters." }),
  description: z.optional(z.string()),
  status: z.string({
    required_error: "Please select an status to display.",
  }),
});

const EditTask = ({ task }: { task: Task }) => {
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description,
      status: task.status,
    },
  });
  function onEdit(values: z.infer<typeof formSchema>) {
    dispatch(editTask({ id: task.id, ...values }));
    toast.success("Task edit successfully");
    console.log(values);
  }
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button className="px-3 py-1 bg-blue-600 hover:bg-blue-900  rounded-md">
            Edit
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="bg-white p-4 border rounded-md shadow-lg z-50 ">
            <h1 className="text-2xl text-center text-blue-600">Edit Task</h1>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onEdit)}>
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Task Name" {...field} />
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
                        <Textarea
                          placeholder="Description about task."
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a verified email to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="To Do">To Do</SelectItem>
                          <SelectItem value="In Progress">
                            In Progress
                          </SelectItem>
                          <SelectItem value="Completed">Completed</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid grid-flow-col gap-2">
                  <Button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-900"
                  >
                    Save
                  </Button>
                  <PopoverClose
                    asChild
                    className="bg-blue-600 hover:bg-blue-900"
                  >
                    <Button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-900"
                    >
                      Cancel
                    </Button>
                  </PopoverClose>
                </div>
              </form>
            </Form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default EditTask;
