package com.proiectTia.fish_now.service;

import com.proiectTia.fish_now.entity.Lake;
import com.proiectTia.fish_now.repository.LakeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class LakeService {

    private final LakeRepository lakeRepository;

    @Autowired
    public LakeService(LakeRepository lakeRepository) {
        this.lakeRepository = lakeRepository;
    }

    public List<Lake> getAllLakes() {
        return lakeRepository.findAll();
    }

    public Optional<Lake> getLakeById(Long id) {
        return lakeRepository.findById(id);
    }

    public Lake saveLake(Lake lake) {
        return lakeRepository.save(lake);
    }

    public void deleteLake(Long id) {
        lakeRepository.deleteById(id);
    }
    
}
