/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.controller;

import com.plataformaescolar.asistencia.model.Clase;
import com.plataformaescolar.asistencia.service.ClaseService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

/**
 *
 * @author bjcan
 */
@RestController
@RequestMapping("/clase")
@Tag(name = "Clase", description = "API para gestion de clases")
public class ClaseController {
    
    @Autowired
    private ClaseService claseService;

    @GetMapping
    public List<Clase> listarClases() {
        return claseService.getClases();
    }

    @PostMapping
    public Clase agregarClase(@RequestBody Clase clase) {
        return claseService.saveClase(clase);
    }

    @GetMapping("/{id}")
    public Clase buscarClase(@PathVariable("id") Long id) {  
        return claseService.getClaseById(id);
    }

    @PutMapping("/{id}")
    public Clase actualizarClase(@PathVariable("id") Long id, @RequestBody Clase clase) {  
        Clase claseExistente = claseService.getClaseById(id);

        claseExistente.setCurso(clase.getCurso());
        claseExistente.setAsignatura(clase.getAsignatura());
        claseExistente.setFecha(clase.getFecha());

        return claseService.saveClase(claseExistente);
    }

    @DeleteMapping("/{id}")
    public String eliminarClase(@PathVariable("id") Long id) {  
        return claseService.deleteClase(id);
    }
}