package com.tom.taskify.service;

import com.tom.taskify.model.Task;
import com.tom.taskify.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    private final TaskRepository repository;

    public TaskService(final TaskRepository repository) {
        this.repository = repository;
    }

    public List<Task> getAllTasks() {
        return repository.findAll();
    }

    public Optional<Task> getTaskById(final Long id) {
        return repository.findById(id);
    }

    public Task createTask(final Task task) {
        return repository.save(task);
    }

    public Task updateTask(final Long id, final Task updated) {
        //TODO: Handle exceptions gracefully
        Task task = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found"));

        task.setTitle(updated.getTitle());
        task.setDescription(updated.getDescription());
        task.setCompleted(updated.isCompleted());
        task.setDueDate(updated.getDueDate());

        return repository.save(task);
    }

    public void deleteTask(Long id) {
        repository.deleteById(id);
    }
}
