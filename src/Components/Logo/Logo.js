import React from 'react';
import './Logo.css';
import Tilt from 'react-tilt';

const Logo = () => {
    return (
        <div className="logo--cointainer">
            <Tilt className="Tilt" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
            <div className="Tilt-inner"> FR </div>
            </Tilt>
        </div>
    );
}

export default Logo;