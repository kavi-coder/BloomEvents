package com.project.bloomevents.Auth;

import com.project.bloomevents.DTO.UserFullDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.Map;

@RestController
@RequestMapping("/user/auth")
@RequiredArgsConstructor
@CrossOrigin("http://localhost:3000")
public class AuthenticationController {
    @Autowired
    private final AuthenticationService service;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody UserFullDTO userdata){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        AuthenticationResponse newUser= service.register(userdata);
        if (newUser!=null) {
            map.put("status", 1);
            map.put("data", newUser);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Registration Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody AuthenticationRequest request){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        AuthenticationResponse user= service.authenticate(request);
        if (user!=null) {
            map.put("status", 1);
            map.put("data", user);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Invalid email or password");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
