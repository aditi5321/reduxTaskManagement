"use client";
import { AppDispatch, RootState } from "@/features/Store";
import { deleteTask, fetchTodo } from "@/features/TaskSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import EditTask from "./EditTask";
import { Button } from "./ui/button";
import { toast } from "sonner";

const TaskList = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const loading = useSelector((state: RootState) => state.tasks.loading);
  const error = useSelector((state: RootState) => state.tasks.error);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchTodo());
  }, [dispatch]);

  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };
  if (loading) {
    return <p>Task is loading....</p>;
  }
  if (error) {
    return <p>there is an error {error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl text-blue-600 text-center underline">Task List</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Method</TableHead>
          </TableRow>
        </TableHeader>
        {tasks.map((task) => (
          <TableBody key={task.id}>
            <TableRow>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>
                {task.description || "No description provided"}
              </TableCell>
              <TableCell>{task.status}</TableCell>
              <TableCell className="grid grid-flow-col gap-2">
                <EditTask task={task} />
                <Button
                  className="px-3 py-1 bg-blue-600 hover:bg-red-600 rounded-md"
                  onClick={() => {
                    handleDelete(task.id);
                    toast("Task delete Successfully");
                  }}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default TaskList;
