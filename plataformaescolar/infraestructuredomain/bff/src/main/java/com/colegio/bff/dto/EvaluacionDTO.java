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
public class EvaluacionDTO {
    private Long evaluacionId;
    private String nombre;
    private Long cursoId;
    private String asignatura;
    private Double notaMaxima;
}
