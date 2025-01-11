package com.proiectTia.fish_now.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "lakes")
@Data
@Getter
@Setter
public class Lake {

    public Lake() {
    }

    public Lake(String name, String location, Double size) {
        this.name = name;
        this.location = location;
        this.size = size;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    private String location;

    private Double size;

}
