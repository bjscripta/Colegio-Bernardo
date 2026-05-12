/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.estudiante.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
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
    private String nombre;
    private String apellido;
    private String rut;
    private String curso;
    private String telefono;

}
