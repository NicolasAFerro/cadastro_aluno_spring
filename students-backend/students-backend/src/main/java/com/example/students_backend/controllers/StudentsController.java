package com.example.students_backend.controllers;

import java.net.URI;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.students_backend.models.Student;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@CrossOrigin
public class StudentsController {
    private List<Student> studentsList = new ArrayList<>();
    // private List<Student> studentsList = Arrays.asList(
    // new Student(1, "joão", "teste@teste", "(15)99999999", 1, 1),
    // new Student(2, "joão2", "teste@teste2", "(15)29999999", 2, 2),
    // new Student(3, "joão3", "teste@teste3", "(15)3999999", 3, 3)

    // );

    @GetMapping("students")
    public List<Student> getProducts() {
        return studentsList;
    }

    @GetMapping("students/{id}")
    public ResponseEntity<Student> getStudenteById(@PathVariable int id) {

        Student student = studentsList.stream()
                .filter(p -> p.getId() == id)
                .findFirst()
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "student not found"));
        return ResponseEntity.ok(student);

    }

    @PostMapping("students")
    public ResponseEntity<Student> setStudent(@RequestBody Student student) {
        // TODO: process POST request
        student.setId(studentsList.size() + 1);
        studentsList.add(student);

        // CTRL . para importar as bibliotecas
        URI location = ServletUriComponentsBuilder
                .fromCurrentContextPath()
                .path("{id}")
                .buildAndExpand(student.getId())
                .toUri();
        // location é uri para esse recurso. O get dele
        return ResponseEntity.created(location).body(student);

    }

}
