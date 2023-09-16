package com.project.bloomevents.Controller;


import com.project.bloomevents.DTO.LoginDetailsDTO;
import com.project.bloomevents.DTO.UpdatePasswordRequestDTO;
import com.project.bloomevents.DTO.UserFullDTO;
import com.project.bloomevents.Model.User;
import com.project.bloomevents.Service.LoginDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/logindetails")
public class LoginController {
    @Autowired
    private LoginDetailsService loginservice;

    @GetMapping("/get/AllLoginDetails")
    public ResponseEntity<?> getAllLoginDetails(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<LoginDetailsDTO> loginList=loginservice.getAllLoginDetails();
        if (!loginList.isEmpty()) {
            map.put("status", 1);
            map.put("data", loginList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Login detail list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addlogindetails")
    public ResponseEntity<?> addLoginDetails(@RequestBody UserFullDTO userdata,@RequestBody User user) throws NoSuchAlgorithmException{
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        LoginDetailsDTO loginDetails = loginservice.addLoginDetails(userdata, user);
        if (loginDetails != null) {
            map.put("status", 1);
            map.put("data", loginDetails);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Login details is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/updatepassword/{userId}")
    public ResponseEntity<?> updatePassword(@PathVariable int userId, @RequestBody UpdatePasswordRequestDTO updateRequest) throws NoSuchAlgorithmException{
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int result = loginservice.updatePassword(userId,updateRequest);

        if (result == 1) {
            map.put("status", 1);
            map.put("data", "Password updated");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else if (result==-1) {
            map.clear();
            map.put("status", 0);
            map.put("message", "User not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else if (result==-2) {
            map.clear();
            map.put("status", 0);
            map.put("message", "Update password is failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Invalid current password");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/defaultPassword/{userId}")
    public ResponseEntity<?> setDefaultPassword(@PathVariable int userId) throws NoSuchAlgorithmException{
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int result = loginservice.setDefaultPassword(userId);

        if (result == 1) {
            map.put("status", 1);
            map.put("data", "Password updated");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
        else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Update password is failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/validateemail")
    public ResponseEntity<?> validateEmail(@RequestBody String email){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean valid = loginservice.validateEmail(email);

        if (valid) {
            map.put("status", 1);
            map.put("message", "Email is available");
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Email is not available");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/emailbyuserid/{userId}")
    public ResponseEntity<?> getEmailByUserId(@PathVariable int userId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        LoginDetailsDTO user = loginservice.getEmailByUserId(userId);

        if (user!=null) {
            map.put("status", 1);
            map.put("data", user.getEmail());
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Email not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }


}
