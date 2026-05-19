package com.plataformaescolar.asistencia.service;

import com.plataformaescolar.asistencia.model.Asistencia;
import com.plataformaescolar.asistencia.repository.AsistenciaRepositoryJPA;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;

@Service
@Transactional
public class AsistenciaService {

    @Autowired
    public AsistenciaRepositoryJPA asistenciaRepository;
    
    @Autowired
    private EstudianteFacade estudianteFacade; 

    public List<Asistencia> getAsistencias() {
        return asistenciaRepository.findAll();
    }

    public Asistencia getAsistenciaById(Long idAsistencia) {
        return asistenciaRepository.findById(idAsistencia)
                .orElseThrow(() -> new RuntimeException("Error, asistencia no encontrada con id: " + idAsistencia));
    }

    public Asistencia saveAsistencia(Asistencia asistencia) {
        // ← AGREGAR VALIDACIÓN
        if (!estudianteFacade.existeEstudiante(asistencia.getEstudianteId())) {
            throw new RuntimeException("Error: El estudiante con ID " + asistencia.getEstudianteId() + " no existe");
        }
        return asistenciaRepository.save(asistencia);
    }

    public String deleteAsistencia(Long idAsistencia) {
        asistenciaRepository.deleteById(idAsistencia);
        return "Asistencia eliminada";
    }
    
    public List<Asistencia> getAsistenciasByEstudianteId(Long estudianteId) {
        return asistenciaRepository.findByEstudianteId(estudianteId);
    }

    public List<Asistencia> getAsistenciasByClaseId(Long claseId) {
        return asistenciaRepository.findByClaseId(claseId);
    }
}