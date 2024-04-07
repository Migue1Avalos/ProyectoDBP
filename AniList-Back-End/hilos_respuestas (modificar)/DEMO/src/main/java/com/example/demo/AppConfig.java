package com.example.demo;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class AppConfig {

    @Value("${backend.base-url}")
    private String backendBaseUrl;

    @Value("${frotend.base-url}")
    private String frontendBaseUrl;

    public String getBackendBaseUrl() {
        return backendBaseUrl;
    }

    public String getFrontendBaseUrl() {
        return frontendBaseUrl;
    }
}
