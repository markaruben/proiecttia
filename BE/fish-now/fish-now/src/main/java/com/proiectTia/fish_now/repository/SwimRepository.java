package com.proiectTia.fish_now.repository;

import com.proiectTia.fish_now.entity.Swim;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SwimRepository extends JpaRepository<Swim, Long> {
    List<Swim> findByLakeId(Long lakeId);
}
