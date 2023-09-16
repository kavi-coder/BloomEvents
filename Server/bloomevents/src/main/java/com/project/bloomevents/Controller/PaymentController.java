package com.project.bloomevents.Controller;

import com.project.bloomevents.DTO.PaymentDTO;
import com.project.bloomevents.Service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/payment")
public class PaymentController {
    @Autowired
    private PaymentService paymentService;

    @GetMapping("/get/allpayments")
    public ResponseEntity<?> getAllPayments(){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        List<PaymentDTO> paymentList = paymentService.getAllPayments();
        if (paymentList!=null) {
            map.put("status", 1);
            map.put("data", paymentList);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Payment list is not found");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }

    @PostMapping("/addpayment")
    public ResponseEntity<?> addPayment(@RequestBody PaymentDTO paymentData){
        Map<String, Object> map = new LinkedHashMap<String, Object>();
        PaymentDTO payment = paymentService.addPayment(paymentData);
        if (payment!=null) {
            map.put("status", 1);
            map.put("data", payment);
            return new ResponseEntity<>(map, HttpStatus.OK);
        } else {
            map.clear();
            map.put("status", 0);
            map.put("message", "Payment Failed");
            return new ResponseEntity<>(map, HttpStatus.OK);
        }
    }
}
