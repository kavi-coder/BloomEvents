package com.project.bloomevents.ServiceImpl;

import com.project.bloomevents.DTO.EventDTO;
import com.project.bloomevents.Model.Event;
import com.project.bloomevents.Repository.EventRepository;
import com.project.bloomevents.Service.EventService;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EventServiceImpl implements EventService {
    @Autowired
    private EventRepository eventRepo;
    @Autowired
    private AddToEventServiceImpl addToEventServiceImpl;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<EventDTO> getAllEvents() {
        try{
            List<Event> list = eventRepo.findAll();
            return modelMapper.map(list, new TypeToken<List<EventDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public EventDTO addEvent(EventDTO eventdata) {
        try{
            Event evnt = modelMapper.map(eventdata, Event.class);
            Event e = eventRepo.save(evnt);
            return modelMapper.map(e, new TypeToken<EventDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public boolean deleteEvent(int eventId) {
        try{
            Event event = eventRepo.getReferenceById(eventId);
            if(event==null){
                return false;
            }
            else{
                eventRepo.deleteById(eventId);
                return true;
            }
        }
        catch(Exception e){
            System.out.println(e.toString());
            return false;
        }
    }

    @Override
    public List<EventDTO> getEventsByUserId(int userId) {
        try{
            List<Event> list = eventRepo.getEventsByUserId(userId);
            return modelMapper.map(list, new TypeToken<List<EventDTO>>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public EventDTO getEventById(int eventId) {
        try{
            Event event = eventRepo.getById(eventId);
            return modelMapper.map(event, new TypeToken<EventDTO>() {
            }.getType());
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public EventDTO placeEvent(EventDTO eventData) {
        try{
            int eventId=eventData.getEventId();
            String placedDate=eventData.getPlacedDate();
            String placedTime=eventData.getPlacedTime();
            int updatedEventId = eventRepo.placeEvent(true,eventId,placedDate,placedTime);
            if(updatedEventId==1){
                addToEventServiceImpl.placePackages(eventId);
                return getEventById(eventId);
            }
            //System.out.println(updatedEventId);
            return null;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }

    @Override
    public boolean bookEvent(int eventId) {
        try{
            int count=eventRepo.bookEvent(true,eventId);
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

    @Override
    public List<String> getBookingDatesByProviderId(int providerId) {
        try{
            List<String> list = eventRepo.getBookingDatesByProviderId(providerId);
            if(list!=null) {
                return list;
            }
            return null;
        }
        catch(Exception e){
            System.out.println(e.toString());
            return null;
        }
    }
}
