package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.BookingDTO;
import com.project.bloomevents.Model.Booking;
import com.project.bloomevents.Repository.BookingRepository;
import com.project.bloomevents.Service.BookingService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {
    @Autowired
    private BookingRepository bookingRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<BookingDTO> getAllBookings() {
        try{
            List<Booking> list = bookingRepo.findAll();
            if(list!=null){
                return modelMapper.map(list, new TypeToken<List<BookingDTO>>() {
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
    public BookingDTO getBookingDetailsByEventId(int eventId) {
        try{
            Booking booking = bookingRepo.getBookingDetailsByEventId(eventId);
            if(booking!=null){
                return modelMapper.map(booking, new TypeToken<BookingDTO>() {
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
    public BookingDTO addBooking(BookingDTO data) {
        try{
            Booking newBooking = modelMapper.map(data, Booking.class);
            Booking booking=bookingRepo.save(newBooking);
            if(booking!=null){
                return modelMapper.map(booking, new TypeToken<BookingDTO>() {
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
