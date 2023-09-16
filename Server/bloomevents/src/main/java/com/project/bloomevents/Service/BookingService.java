package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.BookingDTO;

import java.util.List;

public interface BookingService {
    List<BookingDTO> getAllBookings();

    BookingDTO getBookingDetailsByEventId(int eventId);

    BookingDTO addBooking(BookingDTO data);
}
