package com.proiectTia.fish_now.dto;

import com.proiectTia.fish_now.entity.User;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class LoginResponseDTO {

    private User user;

    private String jwt;

    public LoginResponseDTO(User user, String jwt) {
        this.user = user;
        this.jwt = jwt;
    }
}
