package com.proiectTia.fish_now.controller;

import com.proiectTia.fish_now.entity.Lake;
import com.proiectTia.fish_now.entity.Swim;
import com.proiectTia.fish_now.service.LakeService;
import com.proiectTia.fish_now.service.SwimService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LakeController {

    private final LakeService lakeService;
    private final SwimService swimService;

    @Autowired
    public LakeController(LakeService lakeService, SwimService swimService) {
        this.lakeService = lakeService;
        this.swimService = swimService;
    }

    @GetMapping("/api/lakes")
    public List<Lake> getAllLakes() {
        return lakeService.getAllLakes();
    }

    @GetMapping("/api/lakes/{id}")
    public Lake getLakeById(@PathVariable Long id) {
        return lakeService.getLakeById(id).orElseThrow(() -> new RuntimeException("Lake not found"));
    }

    @GetMapping("/api/lakes/{id}/swims")
    public List<Swim> getSwimsByLakeId(@PathVariable Long id) {
        return swimService.getSwimsByLakeId(id);
    }

    @PostMapping("/api/lakes")
    public Lake createLake(@RequestBody Lake lake) {
        return lakeService.saveLake(lake);
    }
}
