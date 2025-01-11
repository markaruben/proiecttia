package com.proiectTia.fish_now.utils;

import com.proiectTia.fish_now.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.stream.Collectors;

@Service
public class TokenHelper {

    @Autowired
    private JwtEncoder jwtEncoder;

    public String generateJwt(Authentication auth) {
        Instant now = Instant.now();

        String username = auth.getName();
        String userId = ((User) auth.getPrincipal()).getId().toString();
        String email = ((User) auth.getPrincipal()).getEmail();

        String scope = auth.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(" "));

        JwtClaimsSet claims = JwtClaimsSet.builder()
                .issuer("self")
                .issuedAt(now)
                .subject(username)
                .claim("userId", userId)
                .claim("username", username)
                .claim("email", email)
                .claim("roles", scope)
                .build();
        return jwtEncoder.encode(JwtEncoderParameters.from(claims)).getTokenValue();
    }
}
