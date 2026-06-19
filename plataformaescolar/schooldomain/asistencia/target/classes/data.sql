INSERT IGNORE INTO clases (clase_id, curso, asignatura, fecha)
VALUES (1, '4A', 'Matematicas', '2026-06-19');

INSERT IGNORE INTO asistencias (asistencia_id, estudiante_id, clase_id, fecha, estado, observacion)
VALUES (1, 1, 1, '2026-06-19', 'PRESENTE', 'Asiste normalmente');