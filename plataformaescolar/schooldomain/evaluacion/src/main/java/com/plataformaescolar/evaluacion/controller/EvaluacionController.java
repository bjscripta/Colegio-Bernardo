/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.evaluacion.controller;

import com.plataformaescolar.evaluacion.model.Evaluacion;
import com.plataformaescolar.evaluacion.service.EvaluacionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 *
 * @author esteban
 */
@RestController
@RequestMapping("/evaluacion")
@Tag(name = "Evaluaciones", description = "API para gestion de evaluaciones")
public class EvaluacionController {
    
    @Autowired
    private EvaluacionService evaluacionService;

    @GetMapping
    public List<Evaluacion> listarEvaluaciones() {
        return evaluacionService.getEvaluaciones();
    }

    @PostMapping
    public Evaluacion agregarEvaluacion(@RequestBody Evaluacion evaluacion) {
        return evaluacionService.saveEvaluacion(evaluacion);
    }

    @GetMapping("/{id}")
    public Evaluacion buscarEvaluacion(@PathVariable("id") Long id) {  
        return evaluacionService.getEvaluacionById(id);
    }

    @PutMapping("/{id}")
    public Evaluacion actualizarEvaluacion(@PathVariable("id") Long id, @RequestBody Evaluacion evaluacion) {  
        Evaluacion evaluacionExistente = evaluacionService.getEvaluacionById(id);

        evaluacionExistente.setNombre(evaluacion.getNombre());
        evaluacionExistente.setCursoId(evaluacion.getCursoId());
        evaluacionExistente.setAsignatura(evaluacion.getAsignatura());
        evaluacionExistente.setNotaMaxima(evaluacion.getNotaMaxima());

        return evaluacionService.saveEvaluacion(evaluacionExistente);
    }

    @DeleteMapping("/{id}")
    public String eliminarEvaluacion(@PathVariable("id") Long id) {  
        return evaluacionService.deleteEvaluacion(id);
    }
}