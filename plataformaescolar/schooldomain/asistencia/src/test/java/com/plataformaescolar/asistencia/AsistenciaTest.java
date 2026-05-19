package com.plataformaescolar.asistencia;

import com.plataformaescolar.asistencia.model.Asistencia;
import com.plataformaescolar.asistencia.repository.AsistenciaRepositoryJPA;
import com.plataformaescolar.asistencia.service.AsistenciaService;
import com.plataformaescolar.asistencia.service.EstudianteFacade;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AsistenciaServiceTest {

    @Mock
    private AsistenciaRepositoryJPA asistenciaRepository;

    @Mock
    private EstudianteFacade estudianteFacade;

    @InjectMocks
    private AsistenciaService asistenciaService;

    @Test
    void testGetAsistencias() {
        Asistencia asistencia = new Asistencia();
        asistencia.setAsistenciaId(1L);
        when(asistenciaRepository.findAll()).thenReturn(Arrays.asList(asistencia));

        List<Asistencia> result = asistenciaService.getAsistencias();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
    }

    @Test
    void testGetAsistenciaById() {
        Asistencia asistencia = new Asistencia();
        asistencia.setAsistenciaId(1L);
        when(asistenciaRepository.findById(1L)).thenReturn(Optional.of(asistencia));

        Asistencia result = asistenciaService.getAsistenciaById(1L);

        assertNotNull(result);
    }

    @Test
    void testGetAsistenciaByIdNotFound() {
        when(asistenciaRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> asistenciaService.getAsistenciaById(99L));
    }

    @Test
    void testSaveAsistenciaSuccess() {
        Asistencia asistencia = new Asistencia();
        asistencia.setEstudianteId(1L);
        asistencia.setEstado("PRESENTE");
        
        when(estudianteFacade.existeEstudiante(1L)).thenReturn(true);
        when(asistenciaRepository.save(any(Asistencia.class))).thenReturn(asistencia);

        Asistencia result = asistenciaService.saveAsistencia(asistencia);

        assertNotNull(result);
        verify(estudianteFacade, times(1)).existeEstudiante(1L);
    }

    @Test
    void testSaveAsistenciaEstudianteNoExiste() {
        Asistencia asistencia = new Asistencia();
        asistencia.setEstudianteId(999L);
        
        when(estudianteFacade.existeEstudiante(999L)).thenReturn(false);

        assertThrows(RuntimeException.class, () -> asistenciaService.saveAsistencia(asistencia));
    }

    @Test
    void testGetAsistenciasByEstudianteId() {
        when(asistenciaRepository.findByEstudianteId(1L)).thenReturn(Arrays.asList(new Asistencia()));

        List<Asistencia> result = asistenciaService.getAsistenciasByEstudianteId(1L);

        assertNotNull(result);
    }

    @Test
    void testDeleteAsistencia() {
        doNothing().when(asistenciaRepository).deleteById(1L);

        String result = asistenciaService.deleteAsistencia(1L);

        assertEquals("Asistencia eliminada", result);
        verify(asistenciaRepository, times(1)).deleteById(1L);
    }
}