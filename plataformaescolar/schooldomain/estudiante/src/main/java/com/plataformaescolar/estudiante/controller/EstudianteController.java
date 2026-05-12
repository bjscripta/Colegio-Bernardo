package com.plataformaescolar.estudiante.controller;

import com.plataformaescolar.estudiante.model.Estudiante;
import com.plataformaescolar.estudiante.service.EstudianteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/estudiante")
public class EstudianteController {
    
    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    public List<Estudiante> listarEstudiantes() {
        return estudianteService.getEstudiantes();
    }

    @PostMapping
    public Estudiante agregarEstudiante(@RequestBody Estudiante estudiante) {
        return estudianteService.saveEstudiante(estudiante);
    }

    @GetMapping("/{id}")
    public Estudiante buscarEstudiante(@PathVariable("id") Long id) {  
        return estudianteService.getEstudianteById(id);
    }

    @PutMapping("/{id}")
    public Estudiante actualizarEstudiante(@PathVariable("id") Long id, @RequestBody Estudiante estudiante) {  
        Estudiante estudianteExistente = estudianteService.getEstudianteById(id);

        estudianteExistente.setNombre(estudiante.getNombre());
        estudianteExistente.setApellido(estudiante.getApellido());
        estudianteExistente.setRut(estudiante.getRut());
        estudianteExistente.setCurso(estudiante.getCurso());
        estudianteExistente.setTelefono(estudiante.getTelefono());

        return estudianteService.saveEstudiante(estudianteExistente);
    }

    @DeleteMapping("/{id}")
    public String eliminarEstudiante(@PathVariable("id") Long id) {  
        return estudianteService.deleteEstudiante(id);
    }
}