package com.plataformaescolar.estudiante.repository;

import com.plataformaescolar.estudiante.model.Estudiante;
import java.util.ArrayList;
import java.util.List;
import org.springframework.stereotype.Repository;
/**
 *
 * @author bjcan
 */
@Repository
public class EstudianteRepository {
    private List<Estudiante> estudiantes = new ArrayList<>();

    public List<Estudiante> mostrarEstudiantes(){
        return estudiantes;
    }

    public Estudiante buscarEstudiantePorId(Long idEstudiante){
        for(Estudiante e : estudiantes) {
            if(e.getId() == idEstudiante){
                return e;
            }
        }
        return null;
    }
    
    public Estudiante agregarEstudiante(Estudiante e){
        estudiantes.add(e);
        return e;
    }
    
    public void eliminarEstudiante(Long idEstudiante){
        Estudiante estudiante = buscarEstudiantePorId(idEstudiante);
        if(estudiante != null){
            estudiantes.remove(estudiante);
        }
    }
    
    public Estudiante actualizarEstudiante(Estudiante e){
        for (int i = 0; i < estudiantes.size(); i++){
            if (estudiantes.get(i).getId() == e.getId()){
                Estudiante aux = estudiantes.get(i);
                aux.setNombre(e.getNombre());
                aux.setApellido(e.getApellido());
                aux.setRut(e.getRut());
                aux.setCurso(e.getCurso());
                aux.setTelefono(e.getTelefono());
                return aux;
            }
        }
        return null;
    }
}
