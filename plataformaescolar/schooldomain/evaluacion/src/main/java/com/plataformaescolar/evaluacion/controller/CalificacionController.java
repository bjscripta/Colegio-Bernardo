/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.evaluacion.controller;

import com.plataformaescolar.evaluacion.model.Calificacion;
import com.plataformaescolar.evaluacion.service.CalificacionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 *
 * @author esteban
 */
@RestController
@RequestMapping("/calificacion")
@Tag(name = "Calificaciones", description = "API para gestion de calificaciones")
public class CalificacionController {
    
    @Autowired
    private CalificacionService calificacionService;

    @GetMapping
    public List<Calificacion> listarCalificaciones() {
        return calificacionService.getCalificaciones();
    }

    @PostMapping
    public Calificacion agregarCalificacion(@RequestBody Calificacion calificacion) {
        return calificacionService.saveCalificacion(calificacion);
    }

    @GetMapping("/{id}")
    public Calificacion buscarCalificacion(@PathVariable("id") Long id) {  
        return calificacionService.getCalificacionById(id);
    }
    
    @GetMapping("/estudiante/{estudianteId}")
    public List<Calificacion> buscarPorEstudiante(@PathVariable("estudianteId") Long estudianteId) {  
        return calificacionService.getCalificacionesByEstudianteId(estudianteId);
    }
    
    @GetMapping("/evaluacion/{evaluacionId}")
    public List<Calificacion> buscarPorEvaluacion(@PathVariable("evaluacionId") Long evaluacionId) {  
        return calificacionService.getCalificacionesByEvaluacionId(evaluacionId);
    }

    @PutMapping("/{id}")
    public Calificacion actualizarCalificacion(@PathVariable("id") Long id, @RequestBody Calificacion calificacion) {  
        Calificacion calificacionExistente = calificacionService.getCalificacionById(id);

        calificacionExistente.setEstudianteId(calificacion.getEstudianteId());
        calificacionExistente.setEvaluacionId(calificacion.getEvaluacionId());
        calificacionExistente.setNota(calificacion.getNota());

        return calificacionService.saveCalificacion(calificacionExistente);
    }

    @DeleteMapping("/{id}")
    public String eliminarCalificacion(@PathVariable("id") Long id) {  
        return calificacionService.deleteCalificacion(id);
    }
}