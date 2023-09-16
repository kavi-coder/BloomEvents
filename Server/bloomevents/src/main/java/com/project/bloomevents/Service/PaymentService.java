package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.PaymentDTO;

import java.util.List;

public interface PaymentService {
    List<PaymentDTO> getAllPayments();

    PaymentDTO addPayment(PaymentDTO payment);
}
