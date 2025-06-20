package com.tom.taskify.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import jakarta.validation.constraints.NotBlank;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Description is required")
    @Column(length = 1000, nullable = false)
    private String description;

    private boolean completed;

    private LocalDateTime dueDate;

}
