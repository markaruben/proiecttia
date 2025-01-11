package com.proiectTia.fish_now.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "swims")
@Data
public class Swim {
    
    public Swim() {

    }

    public Swim(Long id) {
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Integer swimNumber;

    @ManyToOne
    @JoinColumn(name = "lake_id", referencedColumnName = "id")
    private Lake lake;


}
