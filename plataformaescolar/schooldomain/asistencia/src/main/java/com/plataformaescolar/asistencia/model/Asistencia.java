/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.model;

import jakarta.persistence.*;
import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 *
 * @author bjcan
 */
@Entity
@Table(name = "asistencias")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Asistencia {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long asistenciaId;
    
    @Column(nullable = false)
    private Long estudianteId;
    
    @Column(nullable = false)
    private Long claseId;
    
    @Column(nullable = false)
    @Temporal(TemporalType.DATE)
    private Date fecha;
    
    @Column(nullable = false)
    private String estado;
    
    private String observacion;
}