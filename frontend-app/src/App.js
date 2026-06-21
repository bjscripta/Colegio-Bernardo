import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './assets/Home';
import Estudiantes from './assets/pages/Estudiantes';
import Asistencia from './assets/pages/Asistencia';
import Evaluaciones from './assets/pages/Evaluaciones';
import Dashboard from './assets/pages/Dashboard';
import Login from './assets/pages/Login';
import Docentes from './assets/pages/Docentes';
import Perfil from './assets/pages/Perfil';
import Administradores from './assets/pages/Administradores';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/estudiantes" element={<Estudiantes />} />
                <Route path="/asistencia" element={<Asistencia />} />
                <Route path="/evaluaciones" element={<Evaluaciones />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/login" element={<Login />} />
                <Route path="/docentes" element={<Docentes />} />
                <Route path="/administradores" element={<Administradores />} />
                <Route path="/perfil" element={<Perfil />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;