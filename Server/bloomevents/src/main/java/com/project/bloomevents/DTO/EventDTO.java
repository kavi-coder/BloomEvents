package com.project.bloomevents.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class EventDTO {
    private int eventId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private int userId;
    private boolean isPlaced;
    private boolean isBooked;
    private String placedDate;
    private String placedTime;
}
