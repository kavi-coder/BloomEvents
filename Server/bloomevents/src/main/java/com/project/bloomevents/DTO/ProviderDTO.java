package com.project.bloomevents.DTO;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ProviderDTO {
    private int providerId;
    private String businessName;
    private String district;
    private String description;
    private String mobile;
    private String facebook;
    private String instagram;
    private String web;
    private double rating;
    private int userId;
    private String categoryName;
    private int categoryId;
    //private int packages ;
}
