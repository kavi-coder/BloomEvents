package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.ReviewDTO;
import com.project.bloomevents.Service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/review")
public class ReviewController {
    @Autowired
    private ReviewService reviewService;

    @GetMapping("/get/allreviews")
    public ResponseEntity<?> getAllReviews(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<ReviewDTO> providerList = reviewService.getAllReviews();

        if (!providerList.isEmpty()) {
            map.put("status", 1);
            map.put("data", providerList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Review list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addreview/{addToEventId}")
    public ResponseEntity<?> addReview(@RequestBody ReviewDTO reviewdata, @PathVariable int addToEventId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        ReviewDTO review=reviewService.addReview(reviewdata,addToEventId);
        if (review != null) {
            map.put("status", 1);
            map.put("data", review);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Review not added");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @DeleteMapping("/deletereview/{reviewId}")
    public ResponseEntity<?> deleteReview(@PathVariable int reviewId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        boolean deleted= reviewService.deleteReview(reviewId);
        if (deleted) {
            map.put("status", 1);
            map.put("data", deleted);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Review not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/reviewsbyproviderid/{providerId}")
    public ResponseEntity<?> getReviewsByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<ReviewDTO> reviewList = reviewService.getReviewsByProviderId(providerId);

        if (reviewList.size()>0 && reviewList!=null) {
            map.put("status", 1);
            map.put("data", reviewList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Review list not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @GetMapping("/get/reviewcountbyproviderid/{providerId}")
    public ResponseEntity<?> getReviewCountByProviderId(@PathVariable int providerId){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        int count = reviewService.getReviewCountByProviderId(providerId);

        if (count>=0) {
            map.put("status", 1);
            map.put("data", count);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "No Reviews");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
