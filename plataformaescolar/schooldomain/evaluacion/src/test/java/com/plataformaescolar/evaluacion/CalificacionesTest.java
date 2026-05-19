package com.plataformaescolar.evaluacion;

import com.plataformaescolar.evaluacion.model.Calificacion;
import com.plataformaescolar.evaluacion.model.Evaluacion;
import com.plataformaescolar.evaluacion.repository.CalificacionRepositoryJPA;
import com.plataformaescolar.evaluacion.repository.EvaluacionRepositoryJPA;
import com.plataformaescolar.evaluacion.service.CalificacionService;
import com.plataformaescolar.evaluacion.service.EstudianteFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class CalificacionServiceTest {

    @Mock
    private CalificacionRepositoryJPA calificacionRepository;

    @Mock
    private EvaluacionRepositoryJPA evaluacionRepository;

    @Mock
    private EstudianteFacade estudianteFacade;

    @InjectMocks
    private CalificacionService calificacionService;

    @Test
    void testSaveCalificacionSuccess() {
        Calificacion calificacion = new Calificacion();
        calificacion.setEstudianteId(1L);
        calificacion.setEvaluacionId(1L);
        calificacion.setNota(6.5);

        Evaluacion evaluacion = new Evaluacion();
        evaluacion.setEvaluacionId(1L);
        evaluacion.setNotaMaxima(7.0);

        when(estudianteFacade.existeEstudiante(1L)).thenReturn(true);
        when(evaluacionRepository.findById(1L)).thenReturn(Optional.of(evaluacion));
        when(calificacionRepository.save(any(Calificacion.class))).thenReturn(calificacion);

        Calificacion result = calificacionService.saveCalificacion(calificacion);

        assertNotNull(result);
        assertEquals(6.5, result.getNota());
    }

    @Test
    void testSaveCalificacionEstudianteNoExiste() {
        Calificacion calificacion = new Calificacion();
        calificacion.setEstudianteId(999L);

        when(estudianteFacade.existeEstudiante(999L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> calificacionService.saveCalificacion(calificacion));
    }

    @Test
    void testSaveCalificacionNotaMayorMaxima() {
        Calificacion calificacion = new Calificacion();
        calificacion.setEstudianteId(1L);
        calificacion.setEvaluacionId(1L);
        calificacion.setNota(8.0);

        Evaluacion evaluacion = new Evaluacion();
        evaluacion.setEvaluacionId(1L);
        evaluacion.setNotaMaxima(7.0);

        when(estudianteFacade.existeEstudiante(1L)).thenReturn(true);
        when(evaluacionRepository.findById(1L)).thenReturn(Optional.of(evaluacion));

        assertThrows(RuntimeException.class, () -> calificacionService.saveCalificacion(calificacion));
    }

    @Test
    void testGetCalificacionById() {
        Calificacion calificacion = new Calificacion();
        calificacion.setCalificacionId(1L);

        when(calificacionRepository.findById(1L)).thenReturn(Optional.of(calificacion));

        Calificacion result = calificacionService.getCalificacionById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetCalificacionByIdNotFound() {
        when(calificacionRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> calificacionService.getCalificacionById(99L));
    }
}