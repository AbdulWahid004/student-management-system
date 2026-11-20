package com.smb.Student_Management_Backend.repository;

import com.smb.Student_Management_Backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    @Query("""
            SELECT s FROM Student s
            WHERE (LOWER(s.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(s.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(s.rollNumber) LIKE LOWER(CONCAT('%', :search, '%')))
              AND (:classGrade = '' OR s.classGrade = :classGrade)
            ORDER BY s.id DESC
            """)
    List<Student> searchStudents(@Param("search") String search,
                                 @Param("classGrade") String classGrade);
}