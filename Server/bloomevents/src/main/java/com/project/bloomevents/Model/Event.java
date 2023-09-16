package com.project.bloomevents.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name="event")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "eventId")
    private int eventId;

    @Column(name = "eventName")
    private String eventName;

    @Column(name = "eventDate")
    private String eventDate;

    @Column(name = "eventTime")
    private String eventTime;

    @Column(name = "isPlaced", columnDefinition = "boolean default false")
    private boolean isPlaced;

    @Column(name = "isBooked", columnDefinition = "boolean default false")
    private boolean isBooked;

    @Column(name = "placedDate")
    private String placedDate;

    @Column(name = "placedTime")
    private String placedTime;

    @OneToOne(mappedBy = "event",cascade = CascadeType.REMOVE)
    private Booking booking;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "userId", referencedColumnName = "userId", nullable = false)
    private User user;

    @OneToMany(mappedBy = "event", cascade = CascadeType.REMOVE)
    private List<AddToEvent> addToEvents;
}
