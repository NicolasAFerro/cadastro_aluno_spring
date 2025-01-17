package com.example.students_backend.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.web.bind.annotation.RestController;

import com.example.students_backend.models.Course;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
public class CoursesController {

    private List<Course> coursesList = Arrays.asList(
            new Course(1, "Java"),
            new Course(2, "Angular"),
            new Course(3, "C#")

    );

    @GetMapping("courses")
    public List<Course> getCourses() {
        return coursesList;
    }

}
