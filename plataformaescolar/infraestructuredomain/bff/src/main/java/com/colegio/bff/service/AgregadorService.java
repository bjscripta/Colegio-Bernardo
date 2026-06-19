package com.colegio.bff.service;

import com.colegio.bff.dto.AsistenciaDTO;
import com.colegio.bff.dto.CalificacionDTO;
import com.colegio.bff.dto.DashboardDTO;
import com.colegio.bff.dto.EstudianteDTO;
import java.util.Arrays;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
public class AgregadorService {

    @Autowired
    private RestTemplate restTemplate;

    @Value("${services.estudiante.url}")
    private String estudianteUrl;

    @Value("${services.asistencia.url}")
    private String asistenciaUrl;

    @Value("${services.calificacion.url}")
    private String calificacionUrl;

    public DashboardDTO getDashboard(Long estudianteId) {
        DashboardDTO dashboard = new DashboardDTO();

        EstudianteDTO estudiante = restTemplate.getForObject(
            estudianteUrl + "/" + estudianteId,
            EstudianteDTO.class
        );
        dashboard.setEstudiante(estudiante);

        String urlAsistencia = asistenciaUrl + "/estudiante/" + estudianteId;
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

        String urlCalificacion = calificacionUrl + "/estudiante/" + estudianteId;
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