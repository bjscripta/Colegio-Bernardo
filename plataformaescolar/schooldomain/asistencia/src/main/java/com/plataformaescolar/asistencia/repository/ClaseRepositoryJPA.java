/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package com.plataformaescolar.asistencia.repository;

import com.plataformaescolar.asistencia.model.Clase;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

/**
 *
 * @author esteban
 */
@Repository
public interface ClaseRepositoryJPA extends JpaRepository<Clase, Long> {
    
    List<Clase> findByCurso(String curso);
    List<Clase> findByAsignatura(String asignatura);
}