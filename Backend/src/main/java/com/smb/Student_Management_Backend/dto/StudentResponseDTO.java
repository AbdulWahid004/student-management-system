package com.smb.Student_Management_Backend.dto;

import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentResponseDTO {

    private Long id;
    private String firstName;
    private String lastName;
    private String rollNumber;
    private String classGrade;
    private String section;
    private String email;
    private String phoneNumber;
    private LocalDate dateOfBirth;
    private String gender;
    private String address;
    private String guardianName;
    private String guardianPhone;
    private LocalDate admissionDate;
    private BigDecimal attendancePercentage;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}