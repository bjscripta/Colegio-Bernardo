package com.plataformaescolar.evaluacion.service;

import com.plataformaescolar.evaluacion.model.Calificacion;
import com.plataformaescolar.evaluacion.model.Evaluacion;
import com.plataformaescolar.evaluacion.repository.CalificacionRepositoryJPA;
import com.plataformaescolar.evaluacion.repository.EvaluacionRepositoryJPA;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.transaction.Transactional;
import java.util.List;

@Service
@Transactional
public class CalificacionService {

    @Autowired
    public CalificacionRepositoryJPA calificacionRepository;
    
    @Autowired
    public EvaluacionRepositoryJPA evaluacionRepository;
    
    @Autowired
    private EstudianteFacade estudianteFacade; 

    public List<Calificacion> getCalificaciones() {
        return calificacionRepository.findAll();
    }

    public Calificacion getCalificacionById(Long id) {
        return calificacionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Error, calificacion no encontrada con id: " + id));
    }
    
    public List<Calificacion> getCalificacionesByEstudianteId(Long estudianteId) {
        return calificacionRepository.findByEstudianteId(estudianteId);
    }
    
    public List<Calificacion> getCalificacionesByEvaluacionId(Long evaluacionId) {
        return calificacionRepository.findByEvaluacionId(evaluacionId);
    }

    public Calificacion saveCalificacion(Calificacion calificacion) {
        if (!estudianteFacade.existeEstudiante(calificacion.getEstudianteId())) {
            throw new RuntimeException("Error: El estudiante con ID " + calificacion.getEstudianteId() + " no existe");
        }
        
        if (calificacion.getNota() == null) {
            throw new RuntimeException("Error, la nota es obligatoria");
        }
        if (calificacion.getNota() < 1.0) {
            throw new RuntimeException("Error, la nota no puede ser menor a 1");
        }
        
        Evaluacion evaluacion = evaluacionRepository.findById(calificacion.getEvaluacionId())
                .orElseThrow(() -> new RuntimeException("Error, evaluacion no encontrada con id: " + calificacion.getEvaluacionId()));
        
        if (calificacion.getNota() > evaluacion.getNotaMaxima()) {
            throw new RuntimeException("Error, la nota no puede ser mayor a " + evaluacion.getNotaMaxima());
        }
        
        return calificacionRepository.save(calificacion);
    }

    public String deleteCalificacion(Long id) {
        calificacionRepository.deleteById(id);
        return "Calificacion eliminada";
    }
}