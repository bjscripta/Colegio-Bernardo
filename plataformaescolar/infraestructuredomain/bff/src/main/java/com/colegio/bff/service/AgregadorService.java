package com.colegio.bff.service;

import com.colegio.bff.dto.AsistenciaDTO;
import com.colegio.bff.dto.CalificacionDTO;
import com.colegio.bff.dto.DashboardDTO;
import com.colegio.bff.dto.EstudianteDTO;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AgregadorService {
    
    @Autowired
    private RestTemplate restTemplate;
    
    private final String ESTUDIANTE_URL = "http://estudiante-service:9091/estudiante";
    private final String ASISTENCIA_URL = "http://asistencia-service:9093/asistencia";
    private final String CALIFICACION_URL = "http://evaluacion-service:9092/calificacion";
    
    public DashboardDTO getDashboard(Long estudianteId) {
        DashboardDTO dashboard = new DashboardDTO();

        EstudianteDTO estudiante = restTemplate.getForObject(
            ESTUDIANTE_URL + "/" + estudianteId, 
            EstudianteDTO.class
        );
        dashboard.setEstudiante(estudiante);

        String urlAsistencia = ASISTENCIA_URL + "/estudiante/" + estudianteId;
        AsistenciaDTO[] asistenciasArray = restTemplate.getForObject(urlAsistencia, AsistenciaDTO[].class);
        List<AsistenciaDTO> asistencias = asistenciasArray != null ? Arrays.asList(asistenciasArray) : List.of();
        dashboard.setAsistencias(asistencias);

        if (!asistencias.isEmpty()) {
            long presentes = asistencias.stream()
                .filter(a -> "PRESENTE".equals(a.getEstado()))
                .count();
            int porcentaje = (int) (presentes * 100 / asistencias.size());
            dashboard.setPorcentajeAsistencia(porcentaje);
        } else {
            dashboard.setPorcentajeAsistencia(0);
        }

        String urlCalificacion = CALIFICACION_URL + "/estudiante/" + estudianteId;
        CalificacionDTO[] calificacionesArray = restTemplate.getForObject(urlCalificacion, CalificacionDTO[].class);
        List<CalificacionDTO> calificaciones = calificacionesArray != null ? Arrays.asList(calificacionesArray) : List.of();
        dashboard.setCalificaciones(calificaciones);
        
        if (!calificaciones.isEmpty()) {
            double promedio = calificaciones.stream()
                .mapToDouble(CalificacionDTO::getNota)
                .average()
                .orElse(0.0);
            dashboard.setPromedioGeneral(promedio);
        } else {
            dashboard.setPromedioGeneral(0.0);
        }
        
        return dashboard;
    }
}