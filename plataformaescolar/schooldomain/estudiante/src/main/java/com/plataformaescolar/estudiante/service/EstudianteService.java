/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.estudiante.service;

import com.plataformaescolar.estudiante.model.Estudiante;
import com.plataformaescolar.estudiante.repository.EstudianteRepositoryJPA;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
/**
 *
 * @author bjcan
 */
@Service
@Transactional
public class EstudianteService {

    @Autowired
    public EstudianteRepositoryJPA estudianteRepository;

    public List<Estudiante> getEstudiantes() {
        return estudianteRepository.findAll();
    }

    public Estudiante getEstudianteById(Long idEstudiante) {
        return estudianteRepository.findById(idEstudiante)
                .orElseThrow(() -> new RuntimeException("Estudiante no encontrado"));
    }

    public Estudiante saveEstudiante(Estudiante estudiante) {
        return estudianteRepository.save(estudiante);
    }

    public String deleteEstudiante(Long idEstudiante) {
        estudianteRepository.deleteById(idEstudiante);
        return "Estudiante eliminado";
    }
}