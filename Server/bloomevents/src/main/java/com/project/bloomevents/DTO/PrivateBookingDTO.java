package com.project.bloomevents.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class PrivateBookingDTO {
    private int privateBookingId;
    private String eventName;
    private String eventDate;
    private String eventTime;
    private int providerId;
}
