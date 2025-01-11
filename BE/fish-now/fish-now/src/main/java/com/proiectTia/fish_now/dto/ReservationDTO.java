package com.proiectTia.fish_now.dto;

import lombok.Getter;

import java.time.LocalDate;

@Getter
public class ReservationDTO {
    private Long id;
    private Long swimId;
    private Long userId;
    private String lakeName;
    private LocalDate startDate;
    private LocalDate endDate;

    public ReservationDTO() {
    }

    public ReservationDTO(Long id, Long swimId, Long userId, LocalDate startDate, LocalDate endDate) {
        this.id = id;
        this.swimId = swimId;
        this.userId = userId;
        this.startDate = startDate;
        this.endDate = endDate;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setLakeName(String lakeName) {
        this.lakeName = lakeName;
    }

    public void setSwimId(Long swimId) {
        this.swimId = swimId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }
}
