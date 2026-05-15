/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.estudiante.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author bjcan
 */
@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Estudiante {
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Id
    private long id;
    
    @NotBlank(message = "El apellido es obligatorio")
    @Column(nullable = false)
    private String nombre;
    
    @NotBlank(message = "El apellido es obligatorio")
    @Column(nullable = false)
    private String apellido;
    
    @NotBlank(message = "El RUT es obligatorio")
    @Column(nullable = false, unique = true)
    private String rut;
    
    private String curso;
    private String telefono;

}
