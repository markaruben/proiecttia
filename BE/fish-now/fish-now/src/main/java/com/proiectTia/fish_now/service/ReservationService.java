package com.proiectTia.fish_now.service;

import com.proiectTia.fish_now.dto.ReservationDTO;
import com.proiectTia.fish_now.entity.Reservation;
import com.proiectTia.fish_now.entity.Swim;
import com.proiectTia.fish_now.entity.User;
import com.proiectTia.fish_now.repository.ReservationRepository;
import com.proiectTia.fish_now.repository.SwimRepository;
import com.proiectTia.fish_now.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ReservationService {

    @Autowired
    private ReservationRepository reservationRepository;

    @Autowired
    private SwimRepository swimRepository;

    @Autowired
    private UserRepository userRepository;

    public List<ReservationDTO> getReservationsForSwim(Long swimId) {
        List<Reservation> reservations = reservationRepository.findBySwimId(swimId);
        return reservations.stream()
                .map(reservation -> new ReservationDTO(
                        reservation.getId(),
                        reservation.getSwim().getId(),
                        reservation.getUser().getId(),
                        reservation.getStartDate(),
                        reservation.getEndDate()
                ))
                .collect(Collectors.toList());
    }

    public List<ReservationDTO> getReservationsForUser(Long userId) {
        List<Reservation> reservations = reservationRepository.findByUserId(userId);

        List<ReservationDTO> reservationDTOs = new ArrayList<>();
        for (Reservation reservation : reservations) {
            ReservationDTO dto = new ReservationDTO();
            dto.setId(reservation.getId());
            dto.setSwimId(reservation.getSwim().getId());
            dto.setLakeName(reservation.getSwim().getLake().getName());
            dto.setStartDate(reservation.getStartDate());
            dto.setEndDate(reservation.getEndDate());
            reservationDTOs.add(dto);
        }

        return reservationDTOs;
    }


    public boolean isSwimAvailable(Long swimId, LocalDate startDate, LocalDate endDate) {
        List<Reservation> conflictingReservations = reservationRepository.findConflictingReservations(swimId, startDate, endDate);
        return conflictingReservations.isEmpty();
    }

    public void deleteReservation(Long reservationId) {
        reservationRepository.deleteById(reservationId);
    }


    public String reserveSwim(Long swimId, Long userId, LocalDate startDate, LocalDate endDate) {
        boolean isAvailable = isSwimAvailable(swimId, startDate, endDate);

        if (isAvailable) {
            Swim swim = swimRepository.findById(swimId)
                    .orElseThrow(() -> new RuntimeException("Swim not found"));
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            Reservation reservation = new Reservation();
            reservation.setSwim(swim);
            reservation.setUser(user);
            reservation.setStartDate(startDate);
            reservation.setEndDate(endDate);
            reservationRepository.save(reservation);
            return "Reservation successful!";
        } else {
            return "Swim is not available for the selected dates.";
        }
    }
}
