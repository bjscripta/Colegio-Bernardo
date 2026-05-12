/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.controller;

import com.plataformaescolar.asistencia.model.Asistencia;
import com.plataformaescolar.asistencia.service.AsistenciaService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
/**
 *
 * @author bjcan
 */
@RestController
@RequestMapping("/asistencia")
@Tag(name = "Asistencia", description = "API para gestion de asistencias")
public class AsistenciaController {
    
    @Autowired
    private AsistenciaService asistenciaService;

    @GetMapping
    public List<Asistencia> listarAsistencias() {
        return asistenciaService.getAsistencias();
    }

    @PostMapping
    public Asistencia agregarAsistencia(@RequestBody Asistencia asistencia) {
        return asistenciaService.saveAsistencia(asistencia);
    }

    @GetMapping("/{id}")
    public Asistencia buscarAsistencia(@PathVariable("id") Long id) {  
        return asistenciaService.getAsistenciaById(id);
    }

    @PutMapping("/{id}")
    public Asistencia actualizarAsistencia(@PathVariable("id") Long id, @RequestBody Asistencia asistencia) {  
        Asistencia asistenciaExistente = asistenciaService.getAsistenciaById(id);

        asistenciaExistente.setEstudianteId(asistencia.getEstudianteId());
        asistenciaExistente.setClaseId(asistencia.getClaseId());
        asistenciaExistente.setFecha(asistencia.getFecha());
        asistenciaExistente.setEstado(asistencia.getEstado());
        asistenciaExistente.setObservacion(asistencia.getObservacion());

        return asistenciaService.saveAsistencia(asistenciaExistente);
    }

    @DeleteMapping("/{id}")
    public String eliminarAsistencia(@PathVariable("id") Long id) {  
        return asistenciaService.deleteAsistencia(id);
    }
}