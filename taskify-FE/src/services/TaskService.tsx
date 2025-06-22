// src/services/taskService.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../api/ApiClient";

// Query key constant
export const TASKS_QUERY_KEY = ["tasks"] as const;

export type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate: string | null;
};

// fetch all tasks
export function useTasks() {
  return useQuery({
    queryKey: TASKS_QUERY_KEY,
    queryFn: () => apiClient.get<Task[]>("/tasks"),
  });
}

// create a task
export function useCreateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task: Omit<Task, "id">) => apiClient.post<Task>("/tasks", task),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}

// update a task
export function useUpdateTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (task: Task) => apiClient.put<Task>(`/tasks/${task.id}`, task),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}

// delete a task
export function useDeleteTask() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => apiClient.delete<void>(`/tasks/${id}`),
    onSuccess: () => qc.invalidateQueries({ queryKey: TASKS_QUERY_KEY }),
  });
}
