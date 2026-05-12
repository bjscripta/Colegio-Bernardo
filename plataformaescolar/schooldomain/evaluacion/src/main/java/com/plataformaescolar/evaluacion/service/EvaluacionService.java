/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.evaluacion.service;

import com.plataformaescolar.evaluacion.model.Evaluacion;
import com.plataformaescolar.evaluacion.repository.EvaluacionRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

/**
 *
 * @author esteban
 */
@Service
@Transactional
public class EvaluacionService {

    @Autowired
    public EvaluacionRepositoryJPA evaluacionRepository;

    public List<Evaluacion> getEvaluaciones() {
        return evaluacionRepository.findAll();
    }

    public Evaluacion getEvaluacionById(Long id) {
        return evaluacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error, evaluacion no encontrada con id: " + id));
    }

    public Evaluacion saveEvaluacion(Evaluacion evaluacion) {
        return evaluacionRepository.save(evaluacion);
    }

    public String deleteEvaluacion(Long id) {
        evaluacionRepository.deleteById(id);
        return "Evaluacion eliminada";
    }
}