package com.smb.Student_Management_Backend.service.impl;

import com.smb.Student_Management_Backend.dto.StudentRequestDTO;
import com.smb.Student_Management_Backend.dto.StudentResponseDTO;
import com.smb.Student_Management_Backend.entity.Student;
import com.smb.Student_Management_Backend.exception.ResourceNotFoundException;
import com.smb.Student_Management_Backend.repository.StudentRepository;
import com.smb.Student_Management_Backend.service.StudentService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentServiceImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Override
    public StudentResponseDTO createStudent(StudentRequestDTO request) {
        Student student = new Student();
        copyFields(request, student);

        if (student.getAdmissionDate() == null) {
            student.setAdmissionDate(LocalDate.now());
        }
        if (student.getAttendancePercentage() == null) {
            student.setAttendancePercentage(BigDecimal.ZERO);
        }

        return toResponse(studentRepository.save(student));
    }

    @Override
    public List<StudentResponseDTO> getAllStudents(String search, String classGrade) {
        String searchText = (search == null) ? "" : search.trim();
        String classText = (classGrade == null) ? "" : classGrade.trim();

        return studentRepository.searchStudents(searchText, classText)
                .stream()
                .map(this::toResponse)
                .toList();
    }

    @Override
    public StudentResponseDTO getStudentById(Long id) {
        return toResponse(findOrThrow(id));
    }

    @Override
    public StudentResponseDTO updateStudent(Long id, StudentRequestDTO request) {
        Student student = findOrThrow(id);
        copyFields(request, student);
        return toResponse(studentRepository.save(student));
    }

    @Override
    public void deleteStudent(Long id) {
        Student student = findOrThrow(id);
        studentRepository.delete(student);
    }

    // ---------- helper methods ----------

    private Student findOrThrow(Long id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Student not found with id " + id));
    }

    private void copyFields(StudentRequestDTO request, Student student) {
        student.setFirstName(request.getFirstName());
        student.setLastName(request.getLastName());
        student.setRollNumber(request.getRollNumber());
        student.setClassGrade(request.getClassGrade());
        student.setSection(request.getSection());
        student.setEmail(request.getEmail());
        student.setPhoneNumber(request.getPhoneNumber());
        student.setDateOfBirth(request.getDateOfBirth());
        student.setGender(request.getGender());
        student.setAddress(request.getAddress());
        student.setGuardianName(request.getGuardianName());
        student.setGuardianPhone(request.getGuardianPhone());
        student.setAdmissionDate(request.getAdmissionDate());
        student.setAttendancePercentage(request.getAttendancePercentage());
    }

    private StudentResponseDTO toResponse(Student s) {
        StudentResponseDTO dto = new StudentResponseDTO();
        dto.setId(s.getId());
        dto.setFirstName(s.getFirstName());
        dto.setLastName(s.getLastName());
        dto.setRollNumber(s.getRollNumber());
        dto.setClassGrade(s.getClassGrade());
        dto.setSection(s.getSection());
        dto.setEmail(s.getEmail());
        dto.setPhoneNumber(s.getPhoneNumber());
        dto.setDateOfBirth(s.getDateOfBirth());
        dto.setGender(s.getGender());
        dto.setAddress(s.getAddress());
        dto.setGuardianName(s.getGuardianName());
        dto.setGuardianPhone(s.getGuardianPhone());
        dto.setAdmissionDate(s.getAdmissionDate());
        dto.setAttendancePercentage(s.getAttendancePercentage());
        dto.setCreatedAt(s.getCreatedAt());
        dto.setUpdatedAt(s.getUpdatedAt());
        return dto;
    }
}