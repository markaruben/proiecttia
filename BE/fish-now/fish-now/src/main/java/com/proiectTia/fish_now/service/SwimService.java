package com.proiectTia.fish_now.service;

import com.proiectTia.fish_now.entity.Swim;
import com.proiectTia.fish_now.repository.SwimRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SwimService {

    private final SwimRepository swimRepository;

    @Autowired
    public SwimService(SwimRepository swimRepository) {
        this.swimRepository = swimRepository;
    }
    
    public List<Swim> getSwimsByLakeId(Long lakeId) {
        return swimRepository.findByLakeId(lakeId);
    }
}

