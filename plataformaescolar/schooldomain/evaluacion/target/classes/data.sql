INSERT IGNORE INTO evaluaciones (evaluacion_id, nombre, curso_id, asignatura, nota_maxima)
VALUES (1, 'Prueba 1', 1, 'Matematicas', 7.0);

INSERT IGNORE INTO calificaciones (calificacion_id, estudiante_id, evaluacion_id, nota)
VALUES (1, 1, 1, 6.5);