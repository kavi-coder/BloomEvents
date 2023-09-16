package com.project.bloomevents.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "private_bookings")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class PrivateBooking {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bookingId")
    private int privateBookingId;

    @Column(name = "eventName")
    private String eventName;
    @Column(name = "eventDate")
    private String eventDate;
    @Column(name = "eventTime")
    private String eventTime;
    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "providerId", referencedColumnName = "providerId", nullable = false)
    private Provider provider;
}
