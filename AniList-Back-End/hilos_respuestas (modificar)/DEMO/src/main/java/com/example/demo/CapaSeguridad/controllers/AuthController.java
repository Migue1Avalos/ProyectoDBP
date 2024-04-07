package com.example.demo.CapaSeguridad.controllers;

import com.example.demo.AppConfig;
import com.example.demo.CapaSeguridad.domain.ResponseDTO;
import com.example.demo.CapaSeguridad.dto.SignUpRequest;
import com.example.demo.CapaSeguridad.dto.SigninRequest;
import com.example.demo.CapaSeguridad.service.AuthenticationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class AuthController {
    private final AuthenticationService authenticationService;

    @Value("${frotend.base-url}")
    private String frontendBaseUrl;
    private final AppConfig appConfig;

    @Autowired
    public AuthController(AuthenticationService authenticationService, AppConfig appConfig) {
        this.authenticationService = authenticationService;
        this.appConfig = appConfig;
    }


    @PostMapping("/signup")
    public ResponseEntity<ResponseDTO> signup(@RequestBody @Valid SignUpRequest request) {
        return ResponseEntity.ok(authenticationService.signup(request));
    }
    @PostMapping("/signin")
    public ResponseEntity<ResponseDTO>  signin(@RequestBody @Valid SigninRequest request) {
        return ResponseEntity.ok(authenticationService.signin(request));
    }

}

