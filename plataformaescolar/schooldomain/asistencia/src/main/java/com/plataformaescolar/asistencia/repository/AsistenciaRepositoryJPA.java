/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.repository;

import com.plataformaescolar.asistencia.model.Asistencia;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/**
 *
 * @author esteban
 */
@Repository
public interface AsistenciaRepositoryJPA extends JpaRepository<Asistencia, Long> {

    List<Asistencia> findByEstudianteId(Long estudianteId);
    List<Asistencia> findByClaseId(Long claseId);
}
