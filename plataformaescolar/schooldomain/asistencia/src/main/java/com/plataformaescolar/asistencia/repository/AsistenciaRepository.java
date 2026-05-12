/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.plataformaescolar.asistencia.repository;

import com.plataformaescolar.asistencia.model.Asistencia;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;

/**
 *
 * @author bjcan
 */
@Repository
public class AsistenciaRepository {
    private List<Asistencia> asistencias = new ArrayList<>();
    private Long contadorId = 1L;

    public List<Asistencia> mostrarAsistencias(){
        return asistencias;
    }

    public Asistencia buscarAsistenciaPorId(Long idAsistencia){
        for(Asistencia a : asistencias) {
            if(a.getAsistenciaId().equals(idAsistencia)){
                return a;
            }
        }
        return null;
    }
    
    public Asistencia agregarAsistencia(Asistencia a){
        a.setAsistenciaId(contadorId++);
        asistencias.add(a);
        return a;
    }
    
    public void eliminarAsistencia(Long idAsistencia){
        Asistencia asistencia = buscarAsistenciaPorId(idAsistencia);
        if(asistencia != null){
            asistencias.remove(asistencia);
        }
    }
    
    public Asistencia actualizarAsistencia(Asistencia a){
        for (int i = 0; i < asistencias.size(); i++){
            if (asistencias.get(i).getAsistenciaId().equals(a.getAsistenciaId())){
                Asistencia aux = asistencias.get(i);
                aux.setEstudianteId(a.getEstudianteId());
                aux.setClaseId(a.getClaseId());
                aux.setFecha(a.getFecha());
                aux.setEstado(a.getEstado());
                aux.setObservacion(a.getObservacion());
                return aux;
            }
        }
        return null;
    }
}