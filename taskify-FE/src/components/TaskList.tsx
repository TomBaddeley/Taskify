import React from "react";
import {
  Table, TableHead, TableBody, TableRow, TableCell,
  Checkbox, IconButton, CircularProgress
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { useTasks, useUpdateTask, useDeleteTask, Task } from "../services/taskService";

export default function TaskList({ onEdit }: { onEdit: (task: Task) => void }) {
  const { data: tasks, isLoading, error } = useTasks();
  const updateTask = useUpdateTask();       // ← for toggling completed
  const deleteTask = useDeleteTask();

  if (isLoading) return <CircularProgress />;
  if (error) return <div>Error loading tasks</div>;

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Done</TableCell>
          <TableCell>Title</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Due</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks!.map(task => (
          <TableRow key={task.id}>
            <TableCell>
              <Checkbox
                checked={task.completed}
                onChange={() =>
                  updateTask.mutate({ ...task, completed: !task.completed })
                }
              />
            </TableCell>
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.dueDate?.slice(0, 10)}</TableCell>
            <TableCell>
              <IconButton
                onClick={() => onEdit(task)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                onClick={() => deleteTask.mutate(task.id)}
              >
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
