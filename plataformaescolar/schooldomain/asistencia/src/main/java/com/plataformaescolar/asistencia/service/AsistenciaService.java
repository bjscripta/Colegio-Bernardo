/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */

package com.plataformaescolar.asistencia.service;

import com.plataformaescolar.asistencia.model.Asistencia;
import com.plataformaescolar.asistencia.repository.AsistenciaRepositoryJPA;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

/**
 *
 * @author bjcan
 */

@Service
@Transactional
public class AsistenciaService {

    @Autowired
    public AsistenciaRepositoryJPA asistenciaRepository;

    public List<Asistencia> getAsistencias() {
        return asistenciaRepository.findAll();
    }

    public Asistencia getAsistenciaById(Long idAsistencia) {
        return asistenciaRepository.findById(idAsistencia)
                .orElseThrow(() -> new RuntimeException("Error, asistencia no encontrada con id: " + idAsistencia));
    }

    public Asistencia saveAsistencia(Asistencia asistencia) {
        return asistenciaRepository.save(asistencia);
    }

    public String deleteAsistencia(Long idAsistencia) {
        asistenciaRepository.deleteById(idAsistencia);
        return "Asistencia eliminada";
    }
}