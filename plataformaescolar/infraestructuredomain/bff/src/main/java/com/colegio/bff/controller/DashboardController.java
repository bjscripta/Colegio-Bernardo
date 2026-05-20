package com.colegio.bff.controller;

import com.colegio.bff.dto.DashboardDTO;
import com.colegio.bff.service.AgregadorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bff")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {
    
    @Autowired
    private AgregadorService agregadorService;
    
    @GetMapping("/dashboard/{estudianteId}")
    public DashboardDTO getDashboard(@PathVariable("estudianteId") Long estudianteId) {
        return agregadorService.getDashboard(estudianteId);
    }
    
    @GetMapping("/health")
    public String health() {
        return "BFF funcionando";
    }
}