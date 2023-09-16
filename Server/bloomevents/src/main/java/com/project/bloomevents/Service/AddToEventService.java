package com.project.bloomevents.Service;

import com.project.bloomevents.DTO.AddToEventDTO;

import java.util.List;

public interface AddToEventService {
    List<AddToEventDTO> getAllAddToEvent();

    AddToEventDTO addPackageToEvent(AddToEventDTO data);

    int getPackageCountByEventId(int eventId);

    boolean placePackages(int eventId);

    List<AddToEventDTO> getPackagesByEventId(int eventId);

    boolean deletePackageById(int addToEventId);

    List<AddToEventDTO> getPlacedPackagesByProviderId(int providerId);

    boolean approvePackage(int addToEventId);

    List<AddToEventDTO> getApprovedPackagesByProviderId(int providerId);

    List<AddToEventDTO> getBookedPackagesByProviderId(int providerId);

    int getApprovedPackageCountByEventId(int eventId);

    List<AddToEventDTO> getAllBookedPackages();

    int getRequestCountByUserId(int userId);

    int getRequestCountByProviderId(int providerId);
}
