/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.colegio.bff.dto;

import lombok.Data;

/**
 *
 * @author bjcan
 */
@Data
public class CalificacionDTO {
    private Long calificacionId;
    private Long estudianteId;
    private Long evaluacionId;
    private Double nota;
}
