package com.proiectTia.fish_now.repository;

import com.proiectTia.fish_now.entity.Reservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

@Repository
public interface ReservationRepository extends JpaRepository<Reservation, Long> {

    List<Reservation> findBySwimId(Long swimId);

    List<Reservation> findByUserId(Long userId);

    @Query("SELECT r FROM Reservation r WHERE r.swim.id = :swimId " +
            "AND ((r.startDate <= :endDate AND r.endDate >= :startDate))")
    List<Reservation> findConflictingReservations(@Param("swimId") Long swimId,
                                                  @Param("startDate") LocalDate startDate,
                                                  @Param("endDate") LocalDate endDate);
}
