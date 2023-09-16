package com.project.bloomevents.Repository;

import com.project.bloomevents.Model.LoginDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface LoginDetailsRepository extends JpaRepository<LoginDetails, Integer> {
    @Transactional
    @Modifying
    @Query("update LoginDetails l set l.password = ?1 where l.loginId = ?2")
    int updatePassword(String password, int loginId);

    @Query(value = "SELECT * FROM bloomeventsdb.login_details WHERE email = ?1", nativeQuery = true)
    LoginDetails validateEmail(String email);

    @Query(value = "SELECT * FROM bloomeventsdb.login_details WHERE login_id = ?1", nativeQuery = true)
    LoginDetails getLoginDetailsById(int loginId);

    @Query(value = "SELECT * FROM bloomeventsdb.login_details WHERE email=?1 LIMIT 1", nativeQuery = true)
    Optional<LoginDetails> findByEmail(String email);

    @Query(value = "SELECT * FROM bloomeventsdb.login_details WHERE user_id=?1 LIMIT 1", nativeQuery = true)
    LoginDetails getEmailByUserId(int userId);

}
