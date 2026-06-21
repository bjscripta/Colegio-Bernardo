package com.plataformaescolar.evaluacion.controller;

import com.plataformaescolar.evaluacion.model.Calificacion;
import com.plataformaescolar.evaluacion.service.CalificacionService;
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
@RequestMapping("/calificacion")
@Tag(name = "Calificaciones", description = "API para gestion de calificaciones")
public class CalificacionController {

    @Autowired
    private CalificacionService calificacionService;

    @GetMapping
    @Operation(summary = "Listar calificaciones", description = "Obtiene todas las calificaciones registradas en el sistema")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de calificaciones obtenido correctamente")
    })
    public List<Calificacion> listarCalificaciones() {
        return calificacionService.getCalificaciones();
    }

    @PostMapping
    @Operation(
        summary = "Crear calificacion",
        description = "Registra una calificacion validando que el estudiante exista y que la nota no supere la nota maxima de la evaluacion."
    )
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificacion creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos invalidos, estudiante inexistente o nota fuera de rango")
    })
    public Calificacion agregarCalificacion(@RequestBody Calificacion calificacion) {
        return calificacionService.saveCalificacion(calificacion);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar calificacion por ID", description = "Obtiene una calificacion segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificacion encontrada"),
        @ApiResponse(responseCode = "404", description = "Calificacion no encontrada")
    })
    public Calificacion buscarCalificacion(
            @Parameter(description = "ID de la calificacion", example = "1")
            @PathVariable("id") Long id) {
        return calificacionService.getCalificacionById(id);
    }

    @GetMapping("/estudiante/{estudianteId}")
    @Operation(summary = "Buscar calificaciones por estudiante", description = "Obtiene calificaciones asociadas a un estudiante")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificaciones encontradas para el estudiante")
    })
    public List<Calificacion> buscarPorEstudiante(
            @Parameter(description = "ID del estudiante", example = "1")
            @PathVariable("estudianteId") Long estudianteId) {
        return calificacionService.getCalificacionesByEstudianteId(estudianteId);
    }

    @GetMapping("/evaluacion/{evaluacionId}")
    @Operation(summary = "Buscar calificaciones por evaluacion", description = "Obtiene calificaciones asociadas a una evaluacion")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificaciones encontradas para la evaluacion")
    })
    public List<Calificacion> buscarPorEvaluacion(
            @Parameter(description = "ID de la evaluacion", example = "1")
            @PathVariable("evaluacionId") Long evaluacionId) {
        return calificacionService.getCalificacionesByEvaluacionId(evaluacionId);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar calificacion", description = "Actualiza los datos de una calificacion existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificacion actualizada correctamente"),
        @ApiResponse(responseCode = "404", description = "Calificacion no encontrada")
    })
    public Calificacion actualizarCalificacion(
            @Parameter(description = "ID de la calificacion", example = "1")
            @PathVariable("id") Long id,
            @RequestBody Calificacion calificacion) {

        Calificacion calificacionExistente = calificacionService.getCalificacionById(id);

        calificacionExistente.setEstudianteId(calificacion.getEstudianteId());
        calificacionExistente.setEvaluacionId(calificacion.getEvaluacionId());
        calificacionExistente.setNota(calificacion.getNota());

        return calificacionService.saveCalificacion(calificacionExistente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar calificacion", description = "Elimina una calificacion segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Calificacion eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Calificacion no encontrada")
    })
    public String eliminarCalificacion(
            @Parameter(description = "ID de la calificacion", example = "1")
            @PathVariable("id") Long id) {
        return calificacionService.deleteCalificacion(id);
    }
}