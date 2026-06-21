package com.plataformaescolar.asistencia.controller;

import com.plataformaescolar.asistencia.model.Asistencia;
import com.plataformaescolar.asistencia.service.AsistenciaService;
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
@RequestMapping("/asistencia")
@Tag(name = "Asistencia", description = "API para gestion de asistencias")
public class AsistenciaController {

    @Autowired
    private AsistenciaService asistenciaService;

    @GetMapping
    @Operation(summary = "Listar asistencias", description = "Obtiene todos los registros de asistencia")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de asistencias obtenido correctamente")
    })
    public List<Asistencia> listarAsistencias() {
        return asistenciaService.getAsistencias();
    }

    @PostMapping
    @Operation(summary = "Crear asistencia", description = "Registra una nueva asistencia para un estudiante y una clase")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia creada correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos invalidos o estudiante inexistente")
    })
    public Asistencia agregarAsistencia(@RequestBody Asistencia asistencia) {
        return asistenciaService.saveAsistencia(asistencia);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar asistencia por ID", description = "Obtiene un registro de asistencia segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia encontrada"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    public Asistencia buscarAsistencia(
            @Parameter(description = "ID de la asistencia", example = "1")
            @PathVariable("id") Long id) {
        return asistenciaService.getAsistenciaById(id);
    }

    @GetMapping("/estudiante/{estudianteId}")
    @Operation(summary = "Buscar asistencias por estudiante", description = "Obtiene asistencias asociadas a un estudiante")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencias encontradas para el estudiante")
    })
    public List<Asistencia> buscarPorEstudiante(
            @Parameter(description = "ID del estudiante", example = "1")
            @PathVariable("estudianteId") Long estudianteId) {
        return asistenciaService.getAsistenciasByEstudianteId(estudianteId);
    }

    @GetMapping("/clase/{claseId}")
    @Operation(summary = "Buscar asistencias por clase", description = "Obtiene asistencias asociadas a una clase")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencias encontradas para la clase")
    })
    public List<Asistencia> buscarPorClase(
            @Parameter(description = "ID de la clase", example = "1")
            @PathVariable("claseId") Long claseId) {
        return asistenciaService.getAsistenciasByClaseId(claseId);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar asistencia", description = "Actualiza los datos de un registro de asistencia existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia actualizada correctamente"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    public Asistencia actualizarAsistencia(
            @Parameter(description = "ID de la asistencia", example = "1")
            @PathVariable("id") Long id,
            @RequestBody Asistencia asistencia) {

        Asistencia asistenciaExistente = asistenciaService.getAsistenciaById(id);

        asistenciaExistente.setEstudianteId(asistencia.getEstudianteId());
        asistenciaExistente.setClaseId(asistencia.getClaseId());
        asistenciaExistente.setFecha(asistencia.getFecha());
        asistenciaExistente.setEstado(asistencia.getEstado());
        asistenciaExistente.setObservacion(asistencia.getObservacion());

        return asistenciaService.saveAsistencia(asistenciaExistente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar asistencia", description = "Elimina un registro de asistencia segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Asistencia eliminada correctamente"),
        @ApiResponse(responseCode = "404", description = "Asistencia no encontrada")
    })
    public String eliminarAsistencia(
            @Parameter(description = "ID de la asistencia", example = "1")
            @PathVariable("id") Long id) {
        return asistenciaService.deleteAsistencia(id);
    }
}