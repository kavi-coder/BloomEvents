package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.PrivateBookingDTO;
import com.project.bloomevents.Service.PrivateBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/privatebooking")
public class PrivateBookingController {
    @Autowired
    private PrivateBookingService privateBookingService;

    @GetMapping("/get/privatebookingsbyproviderid/{providerId}")
    public ResponseEntity<?> getPrivateBookingsByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<PrivateBookingDTO> bookingList = privateBookingService.getPrivateBookingsByProviderId(providerId);

        if (bookingList!=null) {
            map.put("status", 1);
            map.put("data", bookingList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Private bookings are not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addprivatebooking")
    public ResponseEntity<?> addPrivateBooking(@RequestBody PrivateBookingDTO privateBookingdadta){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        PrivateBookingDTO booking = privateBookingService.addPrivateBooking(privateBookingdadta);

        if (booking!=null) {
            map.put("status", 1);
            map.put("data", booking);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Adding Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deleteprivatebookingbyid/{bookingId}")
    public ResponseEntity<?> deletePrivateBookingById(@PathVariable int bookingId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean deleted = privateBookingService.deletePrivateBookingById(bookingId);

        if (deleted==true) {
            map.put("status", 1);
            map.put("data", true);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Delete Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
