import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, isSignedIn }) => {
        if (isSignedIn === true) {
        return (
            <nav>
                <p onClick={ () => onRouteChange('signout')} >sign out</p>
            </nav>
        );
        } else {
           return (
            <nav>
                <p onClick={ () => onRouteChange('signin')} >sign in</p>
                <p onClick={ () => onRouteChange('register')} >register</p>
            </nav>
            );
        }
}

export default Navigation;