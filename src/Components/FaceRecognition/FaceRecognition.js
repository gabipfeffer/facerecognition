import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
    return (
        <div className="facerecognition--container">
            <div className="facerecognition--placeholder">
                <img id='inputimage' style={{ width:'400px', height:'auto' }} src={imageUrl} alt=""/>
                <div className="bounding-box" style={{ top: box.top_row, bottom: box.bottom_row, right: box.right_col, left: box.left_col }} ></div>
            </div>
        </div>
    );
}

export default FaceRecognition;