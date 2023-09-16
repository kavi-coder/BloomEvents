package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.PaymentDTO;
import com.project.bloomevents.Model.Payment;
import com.project.bloomevents.Repository.PaymentRepository;
import com.project.bloomevents.Service.PaymentService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PaymentDTO> getAllPayments() {
        try{
            List<Payment> list = paymentRepo.findAll();
            if(list!=null){
                return modelMapper.map(list, new TypeToken<List<PaymentDTO>>() {
                }.getType());
            }
            return null;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public PaymentDTO addPayment(PaymentDTO payment) {
        try{
            Payment newPayment=modelMapper.map(payment, Payment.class);
            Payment pay=paymentRepo.save(newPayment);
            if(pay!=null){
                return modelMapper.map(pay, new TypeToken<PaymentDTO>() {
                }.getType());
            }
           return null;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
}
