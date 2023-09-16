package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.EventDTO;
import com.project.bloomevents.Service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/event")
public class EventController {
    @Autowired
    private EventService eventService;

    @GetMapping("/get/allevents")
    public ResponseEntity<?> getAllEvents() {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<EventDTO> eventList = eventService.getAllEvents();
        if (!eventList.isEmpty()) {
            map.put("status", 1);
            map.put("data", eventList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addevent")
    public ResponseEntity<?> addEvent(@RequestBody EventDTO eventdata) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        EventDTO event = eventService.addEvent(eventdata);
        if (event != null) {
            map.put("status", 1);
            map.put("data", event);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deleteevent/{eventId}")
    public ResponseEntity<?> deleteEvent(@PathVariable int eventId) {
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean deleted = eventService.deleteEvent(eventId);
        if (deleted) {
            map.put("status", 1);
            map.put("data", deleted);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/eventsbyuserid/{userId}")
    public ResponseEntity<?> getEventsByUserId(@PathVariable int userId){
        Map<String,Object> map=new LinkedHashMap<String,Object>();
        List<EventDTO> eventList = eventService.getEventsByUserId(userId);
        if (!eventList.isEmpty()) {
            map.put("status", 1);
            map.put("data", eventList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/eventbyid/{eventId}")
    public ResponseEntity<?> getEventById(@PathVariable int eventId){
        Map<String,Object> map=new LinkedHashMap<String,Object>();
        EventDTO event = eventService.getEventById(eventId);
        if (event!=null) {
            map.put("status", 1);
            map.put("data", event);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/placeevent")
    public ResponseEntity<?> placeEvent(@RequestBody EventDTO eventData){
        Map<String,Object> map=new LinkedHashMap<String,Object>();
        EventDTO event = eventService.placeEvent(eventData);
        if (event!=null) {
            map.put("status", 1);
            map.put("data", event);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/bookevent/{eventId}")
    public ResponseEntity<?> bookEvent(@PathVariable int eventId){
        Map<String,Object> map=new LinkedHashMap<String,Object>();
        boolean booked = eventService.bookEvent(eventId);
        if (booked == true) {
            map.put("status", 1);
            map.put("data", booked);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Event not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/bookingdatesbyproviderid/{providerId}")
    public ResponseEntity<?> getBookingDatesByProviderId(@PathVariable int providerId){
        Map<String,Object> map=new LinkedHashMap<String,Object>();
        List<String> list= eventService.getBookingDatesByProviderId(providerId);
        if (list!=null) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No booking dates");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
