/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.plataformaescolar.evaluacion.repository;

import com.plataformaescolar.evaluacion.model.Calificacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 *
 * @author esteban
 */
@Repository
public interface CalificacionRepositoryJPA extends JpaRepository<Calificacion, Long> {
    
    List<Calificacion> findByEstudianteId(Long estudianteId);
    List<Calificacion> findByEvaluacionId(Long evaluacionId);
}