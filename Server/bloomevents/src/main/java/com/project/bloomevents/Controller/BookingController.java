package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.BookingDTO;
import com.project.bloomevents.Service.BookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/bookings")
public class BookingController {
    @Autowired
    private BookingService bookingService;

    @GetMapping("/get/allbookings")
    public ResponseEntity<?> getAllBookings(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<BookingDTO> bookingsList = bookingService.getAllBookings();
        if (!bookingsList.isEmpty()) {
            map.put("status", 1);
            map.put("data", bookingsList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Booking list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/bookingdetailsbyeventid/{eventId}")
    public ResponseEntity<?> getBookingDetailsByEventId(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        BookingDTO booking = bookingService.getBookingDetailsByEventId(eventId);
        if (booking!=null) {
            map.put("status", 1);
            map.put("data", booking);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Booking list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addbooking")
    public ResponseEntity<?> addBooking(@RequestBody BookingDTO data){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        BookingDTO booking = bookingService.addBooking(data);
        if (booking!=null) {
            map.put("status", 1);
            map.put("data", booking);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Booking list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

}
