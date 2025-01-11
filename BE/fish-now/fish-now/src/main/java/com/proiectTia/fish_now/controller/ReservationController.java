package com.proiectTia.fish_now.controller;

import com.proiectTia.fish_now.dto.ReservationDTO;
import com.proiectTia.fish_now.dto.ReservationRequestDTO;
import com.proiectTia.fish_now.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/reservations")
public class ReservationController {

    @Autowired
    private ReservationService reservationService;

    @PostMapping("/make")
    public ResponseEntity<String> makeReservation(@RequestBody ReservationRequestDTO requestDTO) {
        LocalDate startDate = requestDTO.getStartDate().atStartOfDay().toLocalDate();
        LocalDate endDate = requestDTO.getEndDate().atStartOfDay().toLocalDate();

        String result = reservationService.reserveSwim(
                requestDTO.getSwimId(),
                requestDTO.getUserId(),
                startDate,
                endDate
        );

        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteReservation(@PathVariable Long id) {
        reservationService.deleteReservation(id);
        return ResponseEntity.ok("Reservation deleted successfully");
    }


    @GetMapping("/{swimId}/reservations")
    public ResponseEntity<List<ReservationDTO>> getReservationsForSwim(@PathVariable Long swimId) {
        List<ReservationDTO> reservations = reservationService.getReservationsForSwim(swimId);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ReservationDTO>> getReservationsForUser(@PathVariable Long userId) {
        List<ReservationDTO> reservations = reservationService.getReservationsForUser(userId);
        return ResponseEntity.ok(reservations);
    }

}
