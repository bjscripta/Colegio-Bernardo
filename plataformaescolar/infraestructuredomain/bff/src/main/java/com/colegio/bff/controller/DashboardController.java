package com.colegio.bff.controller;

import com.colegio.bff.dto.DashboardDTO;
import com.colegio.bff.service.AgregadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/bff")
public class DashboardController {
    
    private static final Logger log = LoggerFactory.getLogger(DashboardController.class);
    
    @Autowired
    private AgregadorService agregadorService;
    
    @PostConstruct
    public void init() {
        log.info("DashboardController inicializado en /bff");
    }
    
    @GetMapping("/dashboard/{estudianteId}")
    public DashboardDTO getDashboard(@PathVariable Long estudianteId) {
        log.info("Dashboard solicitado para estudiante: {}", estudianteId);
        return agregadorService.getDashboard(estudianteId);
    }
    
    @GetMapping("/health")
    public String health() {
        return "BFF funcionando";
    }
}