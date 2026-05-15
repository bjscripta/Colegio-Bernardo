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
public class EstudianteDTO {
    private long id;
    private String nombre;
    private String apellido;
    private String rut;
    private String curso;
    private String telefono;
}
