package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.UserDTO;
import com.project.bloomevents.DTO.UserFullDTO;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface UserService {
    List<UserDTO> getAllUsers();
    UserDTO addUser(UserFullDTO userdata) throws NoSuchAlgorithmException;
    UserDTO getUserById(int userid);
    UserDTO updateUser(UserFullDTO userdata);
    boolean deleteUser(int userId);

    int changeRole(int userId);

    //String addUser(UserFullDTO userdata);
}
