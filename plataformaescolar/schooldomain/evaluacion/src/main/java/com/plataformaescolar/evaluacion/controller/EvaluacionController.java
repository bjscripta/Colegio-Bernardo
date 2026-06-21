package com.plataformaescolar.evaluacion.controller;

import com.plataformaescolar.evaluacion.model.Evaluacion;
import com.plataformaescolar.evaluacion.service.EvaluacionService;
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
 * @author esteban
 */

@RestController
@RequestMapping("/evaluacion")
@Tag(name = "Evaluaciones", description = "API para gestion de evaluaciones")
public class EvaluacionController {

    @Autowired
    private EvaluacionService evaluacionService;

    @GetMapping
    @Operation(summary = "Listar evaluaciones", description = "Obtiene todas las evaluaciones registradas en el sistema")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de evaluaciones obtenido correctamente")
    })
    public List<Evaluacion> listarEvaluaciones() {
        return evaluacionService.getEvaluaciones();
    }

    @PostMapping
    @Operation(summary = "Crear evaluacion", description = "Registra una nueva evaluacion asociada a un curso y asignatura")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evaluacion creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Evaluacion agregarEvaluacion(@RequestBody Evaluacion evaluacion) {
        return evaluacionService.saveEvaluacion(evaluacion);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar evaluacion por ID", description = "Obtiene una evaluacion segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evaluacion encontrada"),
        @ApiResponse(responseCode = "404", description = "Evaluacion no encontrada")
    })
    public Evaluacion buscarEvaluacion(
            @Parameter(description = "ID de la evaluacion", example = "1")
            @PathVariable("id") Long id) {
        return evaluacionService.getEvaluacionById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar evaluacion", description = "Actualiza los datos de una evaluacion existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evaluacion actualizada correctamente"),
        @ApiResponse(responseCode = "404", description = "Evaluacion no encontrada")
    })
    public Evaluacion actualizarEvaluacion(
            @Parameter(description = "ID de la evaluacion", example = "1")
            @PathVariable("id") Long id,
            @RequestBody Evaluacion evaluacion) {

        Evaluacion evaluacionExistente = evaluacionService.getEvaluacionById(id);

        evaluacionExistente.setNombre(evaluacion.getNombre());
        evaluacionExistente.setCursoId(evaluacion.getCursoId());
        evaluacionExistente.setAsignatura(evaluacion.getAsignatura());
        evaluacionExistente.setNotaMaxima(evaluacion.getNotaMaxima());

        return evaluacionService.saveEvaluacion(evaluacionExistente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar evaluacion", description = "Elimina una evaluacion segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Evaluacion eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Evaluacion no encontrada")
    })
    public String eliminarEvaluacion(
            @Parameter(description = "ID de la evaluacion", example = "1")
            @PathVariable("id") Long id) {
        return evaluacionService.deleteEvaluacion(id);
    }
}