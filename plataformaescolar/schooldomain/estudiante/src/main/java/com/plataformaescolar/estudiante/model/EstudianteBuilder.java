package com.plataformaescolar.estudiante.model;

public class EstudianteBuilder {
    private long id;
    private String nombre;
    private String apellido;
    private String rut;
    private String curso;
    private String telefono;

    public EstudianteBuilder setId(long id) {
        this.id = id;
        return this;
    }

    public EstudianteBuilder setNombre(String nombre) {
        this.nombre = nombre;
        return this;
    }

    public EstudianteBuilder setApellido(String apellido) {
        this.apellido = apellido;
        return this;
    }

    public EstudianteBuilder setRut(String rut) {
        this.rut = rut;
        return this;
    }

    public EstudianteBuilder setCurso(String curso) {
        this.curso = curso;
        return this;
    }

    public EstudianteBuilder setTelefono(String telefono) {
        this.telefono = telefono;
        return this;
    }

    public Estudiante build() {
        Estudiante estudiante = new Estudiante();
        estudiante.setId(id);
        estudiante.setNombre(nombre);
        estudiante.setApellido(apellido);
        estudiante.setRut(rut);
        estudiante.setCurso(curso);
        estudiante.setTelefono(telefono);
        return estudiante;
    }
}