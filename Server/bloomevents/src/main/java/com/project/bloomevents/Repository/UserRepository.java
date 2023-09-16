package com.project.bloomevents.Repository;

import com.project.bloomevents.Enums.Role;
import com.project.bloomevents.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    @Transactional
    @Modifying
    @Query("update User u set u.role = ?1 where u.userId = ?2")
    int changeRole(Role role, int userId);
    @Transactional
    @Modifying
    @Query("update User u set u.firstName = ?1, u.lastName = ?2, u.mobile = ?3, u.district = ?4 where u.userId = ?5")
    int updateUser(String firstName, String lastName, int mobile, String district, int userId);

    @Query(value = "SELECT * FROM bloomeventsdb.user WHERE user_id=?1 LIMIT 1", nativeQuery = true)
    User getUserbyId(@Param(value="userId") int userid);

    @Query(value = "SELECT * FROM bloomeventsdb.user WHERE login_id=?1 LIMIT 1", nativeQuery = true)
    User getUserbyLoginId(@Param(value="userId") int loginId);

    @Query(value = "SELECT * FROM bloomeventsdb.user WHERE user_id=(SELECT user_id FROM bloomeventsdb.login_details WHERE email=?1 LIMIT 1) LIMIT 1", nativeQuery = true)
    Optional<User> findByEmail(String email);
}
