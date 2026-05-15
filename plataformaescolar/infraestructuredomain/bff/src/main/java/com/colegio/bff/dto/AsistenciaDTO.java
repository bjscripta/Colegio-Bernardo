/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.colegio.bff.dto;

import java.util.Date;
import lombok.Data;

/**
 *
 * @author bjcan
 */
@Data
public class AsistenciaDTO {
    private Long asistenciaId;
    private Long estudianteId;
    private Long claseId;
    private Date fecha;
    private String estado;
    private String observacion;
}
