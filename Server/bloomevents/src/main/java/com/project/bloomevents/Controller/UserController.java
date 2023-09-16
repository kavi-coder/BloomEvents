package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.UserDTO;
import com.project.bloomevents.DTO.UserFullDTO;
import com.project.bloomevents.Service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin("http://localhost:3000")
public class UserController {
    @Autowired
    private UserService userService;


    @GetMapping("/get/allusers")
    public ResponseEntity<?> getAllUsers(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<UserDTO> userList= userService.getAllUsers();
        if (!userList.isEmpty()) {
            map.put("status", 1);
            map.put("data", userList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "User list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addUser")
    public ResponseEntity<?>  addUser(@RequestBody UserFullDTO userdata) throws NoSuchAlgorithmException {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        UserDTO user = userService.addUser(userdata);
        //String user = userService.addUser(userdata);
        if (user != null) {
            map.put("status", 1);
            map.put("data", user);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "User not added");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/userbyid/{userid}")
    public ResponseEntity<?>  getUserById(@PathVariable int userid) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        UserDTO user = userService.getUserById(userid);
        if (user != null) {
            map.put("status", 1);
            map.put("data", user);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "User not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/updateuser")
    public ResponseEntity<?>  updateUser(@RequestBody UserFullDTO userdata) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        UserDTO user = userService.updateUser(userdata);
        if (user != null) {
            map.put("status", 1);
            map.put("data", user);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Update failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deleteuser/{userId}")
    public ResponseEntity<?>  deleteUser(@PathVariable int userId) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean deleted = userService.deleteUser(userId);;
        if (deleted) {
            map.put("status", 1);
            map.put("data", deleted);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "User not deleted");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/changerole/{userId}")
    public ResponseEntity<?>  changeRole(@PathVariable int userId) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = userService.changeRole(userId);;
        if (count==1) {
            map.put("status", 1);
            map.put("data", true);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", false);
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
