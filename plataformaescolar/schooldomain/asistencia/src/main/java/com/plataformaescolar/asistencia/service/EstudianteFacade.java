package com.plataformaescolar.asistencia.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class EstudianteFacade {
    
    @Autowired
    private RestTemplate restTemplate;
    
    private final String ESTUDIANTE_URL = "http://estudiante-service:9091/estudiante";
    
    public boolean existeEstudiante(Long estudianteId) {
        try {
            restTemplate.getForObject(ESTUDIANTE_URL + "/" + estudianteId, Object.class);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}