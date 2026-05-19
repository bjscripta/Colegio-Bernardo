package com.plataformaescolar.estudiante;

import com.plataformaescolar.estudiante.model.Estudiante;
import com.plataformaescolar.estudiante.repository.EstudianteRepositoryJPA;
import com.plataformaescolar.estudiante.service.EstudianteService;

import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class EstudianteServiceTest {

    @Mock
    private EstudianteRepositoryJPA estudianteRepository;

    @InjectMocks
    private EstudianteService estudianteService;

    @Test
    void testGetEstudiantes() {
        Estudiante estudiante = new Estudiante();
        estudiante.setId(1L);
        estudiante.setNombre("Juan");
        estudiante.setApellido("Perez");
        when(estudianteRepository.findAll()).thenReturn(Arrays.asList(estudiante));

        List<Estudiante> result = estudianteService.getEstudiantes();

        assertFalse(result.isEmpty());
        assertEquals(1, result.size());
        assertEquals("Juan", result.get(0).getNombre());
    }

    @Test
    void testGetEstudianteById() {
        Estudiante estudiante = new Estudiante();
        estudiante.setId(1L);
        estudiante.setNombre("Juan");
        when(estudianteRepository.findById(1L)).thenReturn(Optional.of(estudiante));

        Estudiante result = estudianteService.getEstudianteById(1L);

        assertNotNull(result);
        assertEquals("Juan", result.getNombre());
    }

    @Test
    void testGetEstudianteByIdNotFound() {
        when(estudianteRepository.findById(99L)).thenReturn(Optional.empty());

        assertThrows(RuntimeException.class, () -> estudianteService.getEstudianteById(99L));
    }

    @Test
    void testSaveEstudiante() {

        Estudiante estudiante = new Estudiante();
        estudiante.setNombre("Maria");
        estudiante.setApellido("Lopez");
        when(estudianteRepository.save(any(Estudiante.class))).thenReturn(estudiante);

        Estudiante result = estudianteService.saveEstudiante(estudiante);

        assertNotNull(result);
        assertEquals("Maria", result.getNombre());
    }

    @Test
    void testDeleteEstudiante() {
        doNothing().when(estudianteRepository).deleteById(1L);
        String result = estudianteService.deleteEstudiante(1L);
        assertEquals("Estudiante eliminado", result);
        verify(estudianteRepository, times(1)).deleteById(1L);
    }
}