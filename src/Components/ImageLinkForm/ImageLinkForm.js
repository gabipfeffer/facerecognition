import React from 'react';
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onPictureSubmit }) => {
    return (
        <div className="imagelinkform--container">
            <p>
                {'This App will detect faces in your pictures.'}
            </p>
            <div className="input--container">
                <input type="text" placeholder="Enter URL here" onChange={onInputChange}/>
                <button onClick={onPictureSubmit} >Detect</button>
            </div>
        </div>
    );
}

export default ImageLinkForm;