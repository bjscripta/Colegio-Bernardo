import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './assets/Home';
import Estudiantes from './assets/pages/Estudiantes';
import Asistencia from './assets/pages/Asistencia';
import Evaluaciones from './assets/pages/Evaluaciones';
import Dashboard from './assets/pages/Dashboard';

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
            </Routes>
        </BrowserRouter>
    );
}

export default App;