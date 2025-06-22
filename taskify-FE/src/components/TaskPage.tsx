import { useState } from "react";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";
import type { Task } from "../services/TaskService";
import { Container, Typography, Box } from "@mui/material";

export default function TaskPage() {
  const [editing, setEditing] = useState<Task | undefined>(undefined);

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Tasks
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">
          {editing ? "Edit Task" : "Create Task"}
        </Typography>
      </Box>
      <Box sx={{ mb: 4 }}>
        <TaskForm
          initialData={editing}
          onSuccess={() => setEditing(undefined)}
        />
      </Box>
      <TaskList onEdit={task => setEditing(task)} />
    </Container>
  );
}
