package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.AddToEventDTO;
import com.project.bloomevents.Service.AddToEventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/addtoevent")
public class AddToEventController {
    @Autowired
    private AddToEventService addToEventService;

    @GetMapping("/get/alladdtoevent")
    public ResponseEntity<?> getAllAddToEvent(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getAllAddToEvent();
        if (!list.isEmpty()) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "add to event list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addpackagetoevent")
    public ResponseEntity<?> addPackageToEvent(@RequestBody AddToEventDTO data){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        AddToEventDTO savedData = addToEventService.addPackageToEvent(data);
        if (savedData!= null) {
            map.put("status", 1);
            map.put("data", savedData);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Adding Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagecountbyeventid/{eventId}")
    public ResponseEntity<?> getPackageCountByEventId(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = addToEventService.getPackageCountByEventId(eventId);
        if (count>=0) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Packages Found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/placePackages/{eventId}")
    public ResponseEntity<?> placePackages(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean success = addToEventService.placePackages(eventId);
        if (success) {
            map.put("status", 1);
            map.put("data", success);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Packages Found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/packagesbyeventid/{eventId}")
    public ResponseEntity<?> getPackagesByEventId(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getPackagesByEventId(eventId);
        if (list.size()>=0) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Packages not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deletepackagebyid/{addToEventId}")
    public ResponseEntity<?> deletePackageById(@PathVariable int addToEventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean deleted = addToEventService.deletePackageById(addToEventId);
        if (deleted) {
            map.put("status", 1);
            map.put("data", deleted);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Delete Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/placedpackagesbyproviderId/{providerId}")
    public ResponseEntity<?> getPlacedPackagesByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getPlacedPackagesByProviderId(providerId);
        if (list != null) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PutMapping("/approvepackage/{addToEventId}")
    public ResponseEntity<?> approvePackage(@PathVariable int addToEventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean approved = addToEventService.approvePackage(addToEventId);
        if (approved == true) {
            map.put("status", 1);
            map.put("data", approved);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Not Approved");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/approvedpackagesbyproviderId/{providerId}")
    public ResponseEntity<?> getApprovedPackagesByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getApprovedPackagesByProviderId(providerId);
        if (list != null) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/bookedpackagesbyproviderId/{providerId}")
    public ResponseEntity<?> getBookedPackagesByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getBookedPackagesByProviderId(providerId);
        if (list != null) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/approvedpackagecountbyeventid/{eventId}")
    public ResponseEntity<?> getApprovedPackageCountByEventId(@PathVariable int eventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = addToEventService.getApprovedPackageCountByEventId(eventId);
        if (count>=0) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/allbookedpackages")
    public ResponseEntity<?> getAllBookedPackages(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<AddToEventDTO> list = addToEventService.getAllBookedPackages();
        if (list != null) {
            map.put("status", 1);
            map.put("data", list);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/requestcountbyuserid/{userId}")
    public ResponseEntity<?> getRequestCountByUserId(@PathVariable int userId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = addToEventService.getRequestCountByUserId(userId);
        if (count>=0) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/requestcountbyproviderid/{providerId}")
    public ResponseEntity<?> getRequestCountByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = addToEventService.getRequestCountByProviderId(providerId);
        if (count>=0) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Events");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
