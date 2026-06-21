package com.plataformaescolar.asistencia.controller;

import com.plataformaescolar.asistencia.model.Clase;
import com.plataformaescolar.asistencia.service.ClaseService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author bjcan
 */

@RestController
@RequestMapping("/clase")
@Tag(name = "Clases", description = "API para gestion de clases")
public class ClaseController {

    @Autowired
    private ClaseService claseService;

    @GetMapping
    @Operation(summary = "Listar clases", description = "Obtiene todas las clases registradas en el sistema")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de clases obtenido correctamente")
    })
    public List<Clase> listarClases() {
        return claseService.getClases();
    }

    @PostMapping
    @Operation(summary = "Crear clase", description = "Registra una nueva clase asociada a un curso y asignatura")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Clase creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Clase agregarClase(@RequestBody Clase clase) {
        return claseService.saveClase(clase);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar clase por ID", description = "Obtiene una clase segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Clase encontrada"),
        @ApiResponse(responseCode = "404", description = "Clase no encontrada")
    })
    public Clase buscarClase(
            @Parameter(description = "ID de la clase", example = "1")
            @PathVariable("id") Long id) {
        return claseService.getClaseById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar clase", description = "Actualiza los datos de una clase existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Clase actualizada correctamente"),
        @ApiResponse(responseCode = "404", description = "Clase no encontrada")
    })
    public Clase actualizarClase(
            @Parameter(description = "ID de la clase", example = "1")
            @PathVariable("id") Long id,
            @RequestBody Clase clase) {

        Clase claseExistente = claseService.getClaseById(id);

        claseExistente.setCurso(clase.getCurso());
        claseExistente.setAsignatura(clase.getAsignatura());
        claseExistente.setFecha(clase.getFecha());

        return claseService.saveClase(claseExistente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar clase", description = "Elimina una clase segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Clase eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Clase no encontrada")
    })
    public String eliminarClase(
            @Parameter(description = "ID de la clase", example = "1")
            @PathVariable("id") Long id) {
        return claseService.deleteClase(id);
    }
}