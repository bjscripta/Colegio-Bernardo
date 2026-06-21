package com.plataformaescolar.estudiante.controller;

import com.plataformaescolar.estudiante.model.Estudiante;
import com.plataformaescolar.estudiante.service.EstudianteService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

/**
 *
 * @author bjcan
 */

@RestController
@RequestMapping("/estudiante")
@Tag(name = "Estudiantes", description = "API para gestion de estudiantes")
public class EstudianteController {

    @Autowired
    private EstudianteService estudianteService;

    @GetMapping
    @Operation(summary = "Listar estudiantes", description = "Obtiene todos los estudiantes registrados en el sistema")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Listado de estudiantes obtenido correctamente")
    })
    public List<Estudiante> listarEstudiantes() {
        return estudianteService.getEstudiantes();
    }

    @GetMapping("/curso/{curso}")
    @Operation(summary = "Buscar estudiantes por curso", description = "Obtiene estudiantes asociados a un curso especifico")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Estudiantes encontrados por curso")
    })
    public List<Estudiante> buscarPorCurso(
            @Parameter(description = "Curso del estudiante", example = "4A")
            @PathVariable("curso") String curso) {
        return estudianteService.getEstudiantesByCurso(curso);
    }

    @PostMapping
    @Operation(summary = "Crear estudiante", description = "Registra un nuevo estudiante en el sistema")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Estudiante creado correctamente"),
        @ApiResponse(responseCode = "400", description = "Datos invalidos")
    })
    public Estudiante agregarEstudiante(@Valid @RequestBody Estudiante estudiante) {
        return estudianteService.saveEstudiante(estudiante);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Buscar estudiante por ID", description = "Obtiene un estudiante segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Estudiante encontrado"),
        @ApiResponse(responseCode = "404", description = "Estudiante no encontrado")
    })
    public Estudiante buscarEstudiante(
            @Parameter(description = "ID del estudiante", example = "1")
            @PathVariable("id") Long id) {
        return estudianteService.getEstudianteById(id);
    }

    @PutMapping("/{id}")
    @Operation(summary = "Actualizar estudiante", description = "Actualiza los datos principales de un estudiante existente")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Estudiante actualizado correctamente"),
        @ApiResponse(responseCode = "404", description = "Estudiante no encontrado")
    })
    public Estudiante actualizarEstudiante(
            @Parameter(description = "ID del estudiante", example = "1")
            @PathVariable("id") Long id,
            @Valid @RequestBody Estudiante estudiante) {

        Estudiante estudianteExistente = estudianteService.getEstudianteById(id);

        estudianteExistente.setNombre(estudiante.getNombre());
        estudianteExistente.setApellido(estudiante.getApellido());
        estudianteExistente.setRut(estudiante.getRut());
        estudianteExistente.setCurso(estudiante.getCurso());
        estudianteExistente.setTelefono(estudiante.getTelefono());

        return estudianteService.saveEstudiante(estudianteExistente);
    }

    @DeleteMapping("/{id}")
    @Operation(summary = "Eliminar estudiante", description = "Elimina un estudiante segun su identificador")
    @ApiResponses({
        @ApiResponse(responseCode = "200", description = "Estudiante eliminado correctamente"),
        @ApiResponse(responseCode = "404", description = "Estudiante no encontrado")
    })
    public String eliminarEstudiante(
            @Parameter(description = "ID del estudiante", example = "1")
            @PathVariable("id") Long id) {
        return estudianteService.deleteEstudiante(id);
    }
}