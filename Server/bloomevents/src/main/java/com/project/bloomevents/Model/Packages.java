package com.project.bloomevents.Model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Table(name = "packages")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Packages {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "packageId")
    private int packageId;

    @Column(name = "packageName")
    private String packageName;

    @Column(name = "price")
    private double price;

    @Column(name = "description")
    private String description;

    @JsonIgnore
    @ManyToOne(cascade = CascadeType.MERGE)
    @JoinColumn(name = "providerId", referencedColumnName = "providerId", nullable = false)
    private Provider provider;

    @OneToMany(mappedBy = "packages", cascade = CascadeType.REMOVE)
    private List<AddToEvent> addToEvents;
}
