package com.project.bloomevents.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class AddToEventDTO {
    private int addToEventId;
    private int packagesPackageId;
    private boolean isApproved;
    private boolean reviewed;
    private boolean isPlaced;
    private int eventId;
    private double quantity;

}
