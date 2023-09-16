package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.LoginDetailsDTO;
import com.project.bloomevents.DTO.UpdatePasswordRequestDTO;
import com.project.bloomevents.DTO.UserFullDTO;
import com.project.bloomevents.Model.User;

import java.security.NoSuchAlgorithmException;
import java.util.List;

public interface LoginDetailsService {

    LoginDetailsDTO addLoginDetails(UserFullDTO userdata, User user) throws NoSuchAlgorithmException;
    int updatePassword(int userId, UpdatePasswordRequestDTO updateRequest) throws NoSuchAlgorithmException;
    List<LoginDetailsDTO> getAllLoginDetails();
    boolean validateEmail(String email);
    LoginDetailsDTO getEmailByUserId(int userId);

    int setDefaultPassword(int userId);
}
