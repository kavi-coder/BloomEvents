package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.EventDTO;

import java.util.List;

public interface EventService {
    List<EventDTO> getAllEvents();
    EventDTO addEvent(EventDTO eventdata);

    boolean deleteEvent(int eventId);

    List<EventDTO> getEventsByUserId(int userId);

    EventDTO getEventById(int eventId);

    EventDTO placeEvent(EventDTO eventData);

    boolean bookEvent(int eventId);

    List<String> getBookingDatesByProviderId(int providerId);
}
