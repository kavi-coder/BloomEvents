package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.PrivateBookingDTO;

import java.util.List;

public interface PrivateBookingService {
    List<PrivateBookingDTO> getPrivateBookingsByProviderId(int providerId);

    PrivateBookingDTO addPrivateBooking(PrivateBookingDTO privateBookingdadta);

    boolean deletePrivateBookingById(int bookingId);
}
