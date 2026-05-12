/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.evaluacion.repository;

import com.plataformaescolar.evaluacion.model.Evaluacion;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 *
 * @author esteban
 */
@Repository
public interface EvaluacionRepositoryJPA extends JpaRepository<Evaluacion, Long> {
    
    List<Evaluacion> findByCursoId(Long cursoId);
    List<Evaluacion> findByAsignatura(String asignatura);
}