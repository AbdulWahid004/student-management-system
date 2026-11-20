package com.smb.Student_Management_Backend.service;

import com.smb.Student_Management_Backend.dto.StudentRequestDTO;
import com.smb.Student_Management_Backend.dto.StudentResponseDTO;

import java.util.List;

public interface StudentService {

    StudentResponseDTO createStudent(StudentRequestDTO request);

    List<StudentResponseDTO> getAllStudents(String search, String classGrade);

    StudentResponseDTO getStudentById(Long id);

    StudentResponseDTO updateStudent(Long id, StudentRequestDTO request);

    void deleteStudent(Long id);
}