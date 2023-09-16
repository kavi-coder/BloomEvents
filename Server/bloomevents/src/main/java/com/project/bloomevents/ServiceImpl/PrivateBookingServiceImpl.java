package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.PrivateBookingDTO;
import com.project.bloomevents.Model.PrivateBooking;
import com.project.bloomevents.Repository.PrivateBookingRepository;
import com.project.bloomevents.Service.PrivateBookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PrivateBookingServiceImpl implements PrivateBookingService {
    @Autowired
    private PrivateBookingRepository privateBookingRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<PrivateBookingDTO> getPrivateBookingsByProviderId(int providerId) {
        try{
            List<PrivateBooking> list = privateBookingRepo.getPrivateBookingsByProviderId(providerId);

            if(list==null){
                return null;
            }
            return modelMapper.map(list, new TypeToken<List<PrivateBookingDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public PrivateBookingDTO addPrivateBooking(PrivateBookingDTO privateBookingdadta) {
        try{
            PrivateBooking booking=modelMapper.map(privateBookingdadta,PrivateBooking.class);
            PrivateBooking savedbooking = privateBookingRepo.save(booking);

            if(savedbooking==null){
                return null;
            }
            return modelMapper.map(savedbooking, new TypeToken<PrivateBookingDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public boolean deletePrivateBookingById(int bookingId) {
        try{
            int count=privateBookingRepo.deleteByPrivateBookingIdEquals(bookingId);

            if(count==1){
                return true;
            }
            return false;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return false;
        }
    }
}
