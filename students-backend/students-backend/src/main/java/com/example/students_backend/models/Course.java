package com.example.students_backend.models;

public class Course {
    private int id_course;
    private String class_name;

    public Course(int id_course, String class_name) {
        this.id_course = id_course;
        this.class_name = class_name;
    }

    public int getId_course() {
        return id_course;
    }

    public void setId_course(int id_course) {
        this.id_course = id_course;
    }

    public String getclass_name() {
        return class_name;
    }

    public void setClass_name(String class_name) {
        this.class_name = class_name;
    }
}
