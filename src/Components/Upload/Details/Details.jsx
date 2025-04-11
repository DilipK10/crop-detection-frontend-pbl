import React from 'react';
import { useLocation } from 'react-router-dom';
import style from './Details.module.css';

const DiseaseDetails = () => {
    const { state } = useLocation();
    const {
        name,
        cure,
        precaution,
        causes,
        treatmentProducts,
        consultant
    } = state || {};

    return (
        <div className={style.detailsContainer}>
            <h2 className={style.heading}>Disease Details</h2>

            <p className={style.detailItem}><strong>Disease Name:</strong> {name}</p>
            <p className={style.detailItem}><strong>Cure:</strong> {cure}</p>
            <p className={style.detailItem}><strong>Precaution:</strong> {precaution}</p>
            <p className={style.detailItem}><strong>Causes:</strong> {causes}</p>
            <p className={style.detailItem}><strong>Treatment Products:</strong> {treatmentProducts?.join(', ')}</p>
            <p className={style.detailItem}><strong>Consultant:</strong> {consultant?.name} ({consultant?.contact})</p>
        </div>
    );
};

export default DiseaseDetails;
