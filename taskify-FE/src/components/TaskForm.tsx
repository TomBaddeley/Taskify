import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { TextField, Button, DatePiicker } from "@mui/material";
import { useCreateTask, useUpdateTask } from "../services/TaskService";
import type { Task } from "../services/TaskService";

type FormData = Omit<Task, "id">;

export default function TaskForm({
    initialData,
    onSuccess
}: {
    initialData?: Task;
    onSuccess: () => void;
}) {
    const { register, handleSubmit, reset } = useForm<FormData>({
        defaultValues: initialData || { title: "", description: "", completed: false, dueDate: null }
    });

    const create = useCreateTask();
    const update = useUpdateTask();

    useEffect(() => {
        reset(initialData || { title: "", description: "", completed: false, dueDate: null });
    }, [initialData, reset]);

    const onSubmit: SubmitHandler<FormData> = data => {
        if (initialData?.id) {
            update.mutate({ ...(data as any), id: initialData.id }, { onSuccess });
        } else {
            create.mutate(data as any, { onSuccess });
        }
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField label="Title" {...register("title", { required: true })} fullWidth margin="normal" />
            <TextField
                label="Description"
                {...register("description")}
                fullWidth
                margin="normal"
                multiline
                rows={3}
            />
            <TextField
                label="Due Date"
                type="date"
                {...register("dueDate")}
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
            />
            <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
                {initialData ? "Update Task" : "Create Task"}
            </Button>
        </form>
    );
}
