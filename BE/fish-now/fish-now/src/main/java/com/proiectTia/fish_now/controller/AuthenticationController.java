package com.proiectTia.fish_now.controller;

import com.proiectTia.fish_now.dto.LoginDTO;
import com.proiectTia.fish_now.dto.LoginResponseDTO;
import com.proiectTia.fish_now.dto.UserDTO;
import com.proiectTia.fish_now.entity.User;
import com.proiectTia.fish_now.service.AuthenticationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/auth")
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    @PostMapping("/register")
    public User registerUser(@RequestBody UserDTO body) {
        return authenticationService.registerUser(body);
    }

    @PostMapping("/login")
    public LoginResponseDTO loginUser(@RequestBody LoginDTO body) {
        return authenticationService.loginUser(body);
    }

}
