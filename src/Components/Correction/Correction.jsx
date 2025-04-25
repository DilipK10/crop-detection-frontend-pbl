import React from 'react';
import { API_URL } from '../../../config';

const Correction = () => {
    const styles = {
        correctionContainer: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '50px',
            width: '200px',
            margin: '10px',
            padding: '10px 20px',
            fontSize: '16px',
            cursor: 'pointer',
        }
    };

    const handleClick = (disease) => {
        fetch(`${API_URL}/predict/set-disease/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ disease })
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Optionally show a confirmation or toast
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <div>
            <button
                style={styles.correctionContainer}
                onClick={() => handleClick('Healthy')}
            >
                Healthy
            </button>
            <br />
            <button
                style={styles.correctionContainer}
                onClick={() => handleClick('Potato Early Blight')}
            >
                Early Blight
            </button>
            <br />
            <button
                style={styles.correctionContainer}
                onClick={() => handleClick('Potato Late Blight')}
            >
                Late Blight
            </button>
        </div>
    );
};

export default Correction;
