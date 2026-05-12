/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.service;

import com.plataformaescolar.asistencia.model.Clase;
import com.plataformaescolar.asistencia.repository.ClaseRepositoryJPA;
import jakarta.transaction.Transactional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author bjcan
 */
@Service
@Transactional
public class ClaseService {
    
    @Autowired
    public ClaseRepositoryJPA claseRepository;

    public List<Clase> getClases() {
        return claseRepository.findAll();
    }

    public Clase getClaseById(Long idClase) {
        return claseRepository.findById(idClase)
                .orElseThrow(() -> new RuntimeException("Error, clase no encontrada con id: " + idClase));
    }

    public Clase saveClase(Clase clase) {
        return claseRepository.save(clase);
    }

    public String deleteClase(Long idClase) {
        claseRepository.deleteById(idClase);
        return "Clase eliminada";
    }
}
