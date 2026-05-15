/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.colegio.bff.dto;

import java.util.List;
import lombok.Data;

/**
 *
 * @author bjcan
 */
@Data
public class DashboardDTO {
    private EstudianteDTO estudiante;
    private List<AsistenciaDTO> asistencias;
    private List<CalificacionDTO> calificaciones;
    private Double promedioGeneral;
    private Integer porcentajeAsistencia;
}
