package com.proiectTia.fish_now.service;

import com.proiectTia.fish_now.dto.LoginDTO;
import com.proiectTia.fish_now.dto.LoginResponseDTO;
import com.proiectTia.fish_now.dto.UserDTO;
import com.proiectTia.fish_now.entity.User;
import com.proiectTia.fish_now.exceptions.AuthenticationFailedException;
import com.proiectTia.fish_now.exceptions.UserNotFoundException;
import com.proiectTia.fish_now.repository.UserRepository;
import com.proiectTia.fish_now.utils.TokenHelper;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class AuthenticationService {

    private final UserRepository userRepository;

    private final PasswordEncoder passwordEncoder;

    private final AuthenticationManager authenticationManager;

    private final TokenHelper tokenHelper;

    public User registerUser(UserDTO body) {
        String encodedPassword = passwordEncoder.encode(body.getPassword());
        User user = new User(body.getUsername(), body.getEmail(), body.getPhone(), body.getRole(), "{bcrypt}" + encodedPassword);
        return userRepository.save(user);
    }

    public LoginResponseDTO loginUser(LoginDTO body) {
        Optional<User> userOptional = userRepository.findByUsername(body.getUsername());
        if (userOptional.isEmpty()) {
            throw new UserNotFoundException("User is not registered!");
        }
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(body.getUsername(), body.getPassword()));

            String token = tokenHelper.generateJwt(auth);
            return new LoginResponseDTO(userRepository.findByUsername(body.getUsername()).get(), token);
        } catch (AuthenticationException e) {
            throw new AuthenticationFailedException("Authentication Failed!");
        }
    }

}
