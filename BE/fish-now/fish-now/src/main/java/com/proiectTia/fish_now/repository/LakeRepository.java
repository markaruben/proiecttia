package com.proiectTia.fish_now.repository;

import com.proiectTia.fish_now.entity.Lake;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface LakeRepository extends JpaRepository<Lake, Long> {

}
