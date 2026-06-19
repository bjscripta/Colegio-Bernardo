import React from 'react';
import '../assets/css/footer.css';

function Footer() {
    return (
        <footer className="app-footer">
            <div className="app-footer-content">
                <div>
                    <h3>Colegio Bernardo</h3>
                    <p>Plataforma escolar para gestión académica y seguimiento estudiantil.</p>
                </div>

                <form className="app-footer-form">
                    <input
                        type="email"
                        placeholder="ejemplo@correo.com"
                        required
                    />
                    <button type="submit">
                        Suscribirse
                    </button>
                </form>
            </div>
        </footer>
    );
}

export default Footer;