package com.smb.Student_Management_Backend.dto;

import jakarta.validation.constraints.*;
import lombok.*;

import java.math.BigDecimal;
import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class StudentRequestDTO {

    @NotBlank(message = "First name is required")
    @Size(max = 50, message = "First name must be at most 50 characters")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(max = 50, message = "Last name must be at most 50 characters")
    private String lastName;

    @NotBlank(message = "Roll number is required")
    @Size(max = 20, message = "Roll number must be at most 20 characters")
    private String rollNumber;

    private String classGrade;
    private String section;

    @Email(message = "Email format is invalid")
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Phone number must be 10 digits")
    private String phoneNumber;

    @Past(message = "Date of birth must be in the past")
    private LocalDate dateOfBirth;

    private String gender;
    private String address;
    private String guardianName;

    @Pattern(regexp = "^[0-9]{10}$", message = "Guardian phone must be 10 digits")
    private String guardianPhone;

    private LocalDate admissionDate;

    @DecimalMin(value = "0.0", message = "Attendance cannot be below 0")
    @DecimalMax(value = "100.0", message = "Attendance cannot be above 100")
    private BigDecimal attendancePercentage;
}